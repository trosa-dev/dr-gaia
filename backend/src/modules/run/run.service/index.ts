import { AdmissionRepository } from './../../admission/admission.repository';
import { Injectable } from '@nestjs/common';
import { RunRepository } from '../run.repository';
import { AdmissionService } from 'src/modules/admission/admission.service';
import { OpenaiService } from 'src/modules/generativeIAs/openai/openai.service';
import { ClaudeService } from 'src/modules/generativeIAs/claude/claude.service';
import { GeminiService } from 'src/modules/generativeIAs/gemini/gemini.service';
import { models } from './constants/models';
import { handleModel } from './functions/handleModel';

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

  async run(params: { run_id: string; prompt: string; temperature: number }) {
    async function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const { run_id, prompt, temperature } = params;

    const admissions = await this.admissionRepository.getAllAdmission();

    const deletar: any[] = [];

    for (let i = 0; i < admissions.length; i++) {
      const admission = await this.admissionService.getAdmission(
        admissions[i].hadm_id,
      );

      for (let j = 0; j < models.length; j++) {
        const model = handleModel(models[j]);

        switch (model) {
          case 'openai':
            console.log({ openai: admission });
            break;
          case 'claude':
            console.log({ claude: admission });
            break;
          case 'gemini':
            console.log({ gemini: admission });
            break;
          default:
            throw 'model is not openai | claude | gemini';
        }
        await delay(2000);
      }
    }

    return { deletar };
  }
}
