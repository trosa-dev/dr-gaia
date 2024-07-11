import { AdmissionRepository } from './../../admission/admission.repository';
import { Injectable } from '@nestjs/common';
import { RunRepository } from '../run.repository';
import { AdmissionService } from 'src/modules/admission/admission.service';
import {
  OpenaiModel,
  OpenaiService,
} from 'src/modules/generativeIAs/openai/openai.service';
import {
  ClaudeModel,
  ClaudeService,
} from 'src/modules/generativeIAs/claude/claude.service';
import {
  GeminiModel,
  GeminiService,
} from 'src/modules/generativeIAs/gemini/gemini.service';
import { models } from './constants/models';
import { handleModel } from './functions/handleModel';
import { handlePrompt } from './functions/handlePrompt';
import { TemperatureEnum } from 'src/modules/generativeIAs/@types/temperatureEnum';
import { responseValidation } from './functions/responseValidation';

@Injectable()
export class RunService {
  constructor(
    private readonly runRepository: RunRepository,
    private readonly admissionService: AdmissionService,
    private readonly admissionRepository: AdmissionRepository,
    private readonly openaiService: OpenaiService,
    private readonly claudeService: ClaudeService,
    private readonly geminiService: GeminiService,
  ) {}

  async run(params: { run_id: string; temperature: TemperatureEnum }) {
    try {
      const { run_id, temperature } = params;

      const admissions = await this.admissionRepository.getAllAdmission();

      for (let i = 0; i < admissions.length; i++) {
        const admission = await this.admissionService.getAdmission(
          admissions[i].hadm_id,
        );

        for (let j = 0; j < models.length; j++) {
          console.log(
            `Running ${i + 1}/${admissions.length} - model ${j + 1}/${models.length}`,
          );
          const platform = handleModel(models[j]);

          let executionTime = 0;
          const startTime = Date.now();
          let endTime = 0;

          try {
            let response: any;

            const prompt = handlePrompt({
              diagnosis: admission.diagnosis,
              icd9_classification: admission.icd9_classification,
            });

            switch (platform) {
              case 'openai':
                response = await this.openaiService.runOpenai({
                  model: models[j] as OpenaiModel,
                  prompt,
                  temperature,
                });
                break;
              case 'claude':
                response = await this.claudeService.runClaude({
                  model: models[j] as ClaudeModel,
                  prompt,
                  temperature,
                });
                break;
              case 'gemini':
                response = await this.geminiService.runGemini({
                  model: models[j] as GeminiModel,
                  prompt,
                  temperature,
                });
                break;
              default:
                throw 'model is not openai | claude | gemini';
            }

            endTime = Date.now();
            executionTime = endTime - startTime;

            if (responseValidation(response) === false) {
              throw 'Response is not valid';
            }

            const message: {
              diagnostic_validation: boolean;
              likert: number;
              disagreement: string[];
            } = JSON.parse(response.message);

            const usage = {
              input_tokens: response?.usage?.input_tokens ?? 0,
              output_tokens: response?.usage?.output_tokens ?? 0,
            };

            const disagreementRate =
              message.disagreement.length /
              admission.icd9_classification.length;

            await this.runRepository.createResult({
              run_id,
              answer_followed_prompt: true,
              diagnostic_validation: message.diagnostic_validation,
              likert: Number(message.likert),
              model: models[j],
              platform: platform,
              processing_time: executionTime,
              temperature,
              error: '',
              input_tokens: usage.input_tokens,
              output_tokens: usage.output_tokens,
              disagreement: message.disagreement.join(', '),
              disagreement_count: message.disagreement.length,
              icd9_codes_count: admission.icd9_classification.length,
              disagreement_rate:
                message.disagreement.length == 0 ? 0 : disagreementRate,
            });
          } catch (error) {
            console.log(error);

            endTime = Date.now();
            executionTime = endTime - startTime;

            await this.runRepository.createResult({
              run_id,
              answer_followed_prompt: false,
              diagnostic_validation: false,
              likert: 0,
              model: models[j],
              platform: platform,
              processing_time: executionTime,
              temperature,
              error: JSON.stringify(error.message),
              input_tokens: 0,
              output_tokens: 0,
              disagreement: '',
              disagreement_count: 0,
              icd9_codes_count: admission.icd9_classification.length,
              disagreement_rate: 0,
            });
          }
        }
      }
    } catch (error) {
      console.log({ error: error });
    }
  }
}
