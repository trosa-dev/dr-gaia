import { Injectable } from '@nestjs/common';
import { AnalysisRepository } from '../../analysis.repository';

@Injectable()
export class GetRunIdService {
  constructor(private readonly analysisRepository: AnalysisRepository) {}

  getRunId(runId: string) {
    return this.analysisRepository.getRunId(runId);
  }
}
