import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetMainAnalysisService } from './analysis.service/services/getMainAnalysis.service';
import { GetProcessingTimeAnalysisService } from './analysis.service/services/getProcessingTimeAnalysis.service';
import { GetRunIdService } from './analysis.service/services/getRunId.service';

@ApiTags('Analysis')
@Controller('analysis')
@Controller()
export class AnalysisController {
  constructor(
    private readonly getMainAnalysisService: GetMainAnalysisService,
    private readonly getProcessingTimeAnalysisService: GetProcessingTimeAnalysisService,
    private readonly getRunIdService: GetRunIdService,
  ) {}

  @Get('/')
  async getMainAnalysis() {
    return await this.getMainAnalysisService.getMainAnalysis();
  }

  @Get('/processing-time')
  async getProcessingTimeAnalysis() {
    return await this.getProcessingTimeAnalysisService.getProcessingTimeAnalysis();
  }

  @Get('/:run_id')
  async getRunId(@Param('run_id') run_id: string) {
    return await this.getRunIdService.getRunId(run_id);
  }
}
