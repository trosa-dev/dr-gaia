import { models } from 'src/modules/run/run.service/constants/models';
import { Injectable } from '@nestjs/common';
import { TemperatureEnum } from 'src/modules/generativeIAs/@types/temperatureEnum';
import { AnalysisRepository } from '../../analysis.repository';

@Injectable()
export class GetProcessingTimeAnalysisService {
  constructor(private readonly analysisRepository: AnalysisRepository) {}

  async getProcessingTimeAnalysis() {
    const temperatures = [TemperatureEnum.minimum, TemperatureEnum.maximum];
    const processingTimeRange = [
      [0, 500],
      [501, 1000],
      [1001, 2000],
      [2001, 3000],
      [3001, 4000],
      [4001, 5000],
      [10001, 15000],
      [15001, 20000],
      [20001, 25000],
      [25001, 30000],
      [31001, 50000],
      [51001, 100000],
    ];

    const response = [];

    for (const model of models) {
      for (const temperature of temperatures) {
        for (const processingTime of processingTimeRange) {
          const query = await this.analysisRepository.getProcessingTime({
            model,
            temperature,
            minProcessingTime: processingTime[0],
            maxProcessingTime: processingTime[1],
          });

          const avgProcessingTime = query._avg.processing_time;
          const total = query._count;

          response.push({
            model,
            temperature,
            processing_time_range: [processingTime[0], processingTime[1]],
            avg_processing_time: avgProcessingTime,
            total,
          });
        }
      }
    }

    return response;
  }
}
