import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RunRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createResult(params: {
    run_id: string;
    answer_followed_prompt: boolean;
    diagnostic_accuracy: boolean;
    platform: string;
    processing_time: number;
  }) {
    const {
      run_id,
      answer_followed_prompt,
      diagnostic_accuracy,
      platform,
      processing_time,
    } = params;

    return await this.prismaService.response.create({
      data: {
        run_id,
        answer_followed_prompt,
        diagnostic_accuracy,
        platform,
        processing_time,
      },
    });
  }
}
