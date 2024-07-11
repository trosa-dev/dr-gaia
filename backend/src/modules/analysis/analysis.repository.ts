import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TemperatureEnum } from '../generativeIAs/@types/temperatureEnum';
import { GeminiModel } from '../generativeIAs/gemini/gemini.service';
import { OpenaiModel } from '../generativeIAs/openai/openai.service';
import { ClaudeModel } from '../generativeIAs/claude/claude.service';

type Modules = GeminiModel | OpenaiModel | ClaudeModel;

@Injectable()
export class AnalysisRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getDisagreementRate(params: {
    temperature?: TemperatureEnum;
    model?: Modules;
    minProcessingTime?: number;
    maxProcessingTime?: number;
    minIicd9CodesCount?: number;
    maxIicd9CodesCount?: number;
    minDisagreementCount?: number;
    maxDisagreementCount?: number;
    diagnostic_validation?: boolean;
    likert?: number;
  }) {
    return this.prismaService.response.aggregate({
      _avg: {
        disagreement_rate: true,
      },
      _count: true,
      where: {
        temperature: params.temperature,
        model: params.model,
        likert: params.likert,
        diagnostic_validation: params.diagnostic_validation,
        processing_time: {
          gte: params.minProcessingTime,
          lte: params.maxProcessingTime,
        },
        icd9_codes_count: {
          gte: params.minIicd9CodesCount,
          lte: params.maxIicd9CodesCount,
        },
        disagreement_count: {
          gte: params.minDisagreementCount,
          lte: params.maxDisagreementCount,
        },
      },
    });
  }

  async getProcessingTime(params: {
    temperature?: TemperatureEnum;
    model?: Modules;
    minProcessingTime?: number;
    maxProcessingTime?: number;
    minIicd9CodesCount?: number;
    maxIicd9CodesCount?: number;
    minDisagreementCount?: number;
    maxDisagreementCount?: number;
    diagnostic_validation?: boolean;
    likert?: number;
  }) {
    return this.prismaService.response.aggregate({
      _avg: {
        processing_time: true,
      },
      _count: true,
      where: {
        temperature: params.temperature,
        model: params.model,
        likert: params.likert,
        diagnostic_validation: params.diagnostic_validation,
        processing_time: {
          gte: params.minProcessingTime,
          lte: params.maxProcessingTime,
        },
        icd9_codes_count: {
          gte: params.minIicd9CodesCount,
          lte: params.maxIicd9CodesCount,
        },
        disagreement_count: {
          gte: params.minDisagreementCount,
          lte: params.maxDisagreementCount,
        },
      },
    });
  }

  getRunId(runId: string) {
    return this.prismaService.response.findMany({
      select: {
        run_id: true,
        answer_followed_prompt: true,
        diagnostic_validation: true,
        disagreement: true,
        disagreement_count: true,
        disagreement_rate: true,
        error: true,
        icd9_codes_count: true,
        id: true,
        input_tokens: true,
        likert: true,
        model: true,
        output_tokens: true,
        platform: true,
        processing_time: true,
        temperature: true,
      },
      where: {
        run_id: runId,
      },
    });
  }
}
