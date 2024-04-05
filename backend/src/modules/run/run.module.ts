import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { RunRepository } from './run.repository';
import { RunController } from './run.controller';
import { RunService } from './run.service';
import { AdmissionModule } from '../admission/admission.module';
import { OpenaiModule } from '../generativeIAs/openai/openai.module';
import { ClaudeModule } from '../generativeIAs/claude/claude.module';
import { GeminiModule } from '../generativeIAs/gemini/gemini.module';

@Module({
  imports: [
    PrismaModule,
    AdmissionModule,
    OpenaiModule,
    ClaudeModule,
    GeminiModule,
  ],
  controllers: [RunController],
  providers: [RunService, RunRepository],
  exports: [RunService],
})
export class RunModule {}
