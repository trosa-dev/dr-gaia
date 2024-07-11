import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisRepository } from './analysis.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AnalysisServiceModule } from './analysis.service/analysis.service.module';

@Module({
  imports: [PrismaModule, AnalysisServiceModule],
  controllers: [AnalysisController],
  providers: [AnalysisRepository],
})
export class AnalysisModule {}
