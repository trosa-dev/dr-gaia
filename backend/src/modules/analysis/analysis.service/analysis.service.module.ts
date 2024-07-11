import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { GetMainAnalysisService } from './services/getMainAnalysis.service';
import { GetProcessingTimeAnalysisService } from './services/getProcessingTimeAnalysis.service';
import { AnalysisRepository } from '../analysis.repository';
import { GetRunIdService } from './services/getRunId.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [
    AnalysisRepository,
    GetMainAnalysisService,
    GetProcessingTimeAnalysisService,
    GetRunIdService,
  ],
  exports: [
    GetMainAnalysisService,
    GetProcessingTimeAnalysisService,
    GetRunIdService,
  ],
})
export class AnalysisServiceModule {}
