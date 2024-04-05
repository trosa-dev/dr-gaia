import { AdmissionRepository } from './../../admission/admission.repository';
import { Injectable } from '@nestjs/common';
import { RunRepository } from '../run.repository';
import { AdmissionService } from 'src/modules/admission/admission.service';
import { OpenaiService } from 'src/modules/generativeIAs/openai/openai.service';
import { ClaudeService } from 'src/modules/generativeIAs/claude/claude.service';
import { GeminiService } from 'src/modules/generativeIAs/gemini/gemini.service';

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

  async run(params: { run_id: string; prompt: string }) {
    const { run_id, prompt } = params;

    const admissions = await this.admissionRepository.getAllAdmission();

    const teste = [];

    //for (let i = 0; i < admissions.length; i++) {
    for (let i = 0; i < 1; i++) {
      const admission = await this.admissionService.getAdmission(
        admissions[i].hadm_id,
      );
    }

    return teste;
  }
}
