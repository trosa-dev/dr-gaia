import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RunRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createResult(params: {
    run_id: string;
    answer_followed_prompt: boolean;
    diagnostic_validation: boolean;
    platform: string;
    processing_time: number;
    model: string;
    temperature: string;
    error: string;
    likert: number;
    input_tokens: number;
    output_tokens: number;
    disagreement: string;
    disagreement_count: number;
    icd9_codes_count: number;
    disagreement_rate: number;
  }) {
    const {
      run_id,
      answer_followed_prompt,
      diagnostic_validation,
      platform,
      processing_time,
      model,
      temperature,
      error,
      likert,
      input_tokens,
      output_tokens,
      disagreement,
      disagreement_count,
      icd9_codes_count,
      disagreement_rate,
    } = params;

    return await this.prismaService.response.create({
      data: {
        model,
        run_id,
        answer_followed_prompt,
        diagnostic_validation,
        platform,
        processing_time,
        temperature,
        error,
        likert,
        input_tokens,
        output_tokens,
        disagreement,
        disagreement_count,
        icd9_codes_count,
        disagreement_rate,
      },
    });
  }
}
