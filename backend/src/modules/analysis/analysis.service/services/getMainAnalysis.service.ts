import { models } from 'src/modules/run/run.service/constants/models';
import { Injectable } from '@nestjs/common';
import { TemperatureEnum } from 'src/modules/generativeIAs/@types/temperatureEnum';
import { AnalysisRepository } from '../../analysis.repository';

@Injectable()
export class GetMainAnalysisService {
  constructor(private readonly analysisRepository: AnalysisRepository) {}

  async getMainAnalysis() {
    const temperatures = [TemperatureEnum.minimum, TemperatureEnum.maximum];
    const icd9CodesCountRanges = [
      [1, 5],
      [6, 10],
      [11, 20],
      [21, 30],
      [31, 40],
      [41, 50],
    ];
    const likertNumbers = [1, 2, 3, 4, 5];
    const diagnosticValidations = [true, false];

    const response = [];

    for (const model of models) {
      for (const temperature of temperatures) {
        for (const diagnostic_validation of diagnosticValidations) {
          for (const icd9CodesCountRange of icd9CodesCountRanges) {
            for (const likert of likertNumbers) {
              const query = await this.analysisRepository.getDisagreementRate({
                model,
                temperature,
                diagnostic_validation,
                minIicd9CodesCount: icd9CodesCountRange[0],
                maxIicd9CodesCount: icd9CodesCountRange[1],
                likert,
              });

              const disagreementRate = query._avg.disagreement_rate;
              const disagreementCount = query._count;

              response.push({
                model,
                temperature,
                likert,
                icd9_codes_range: [
                  icd9CodesCountRange[0],
                  icd9CodesCountRange[1],
                ],
                disagreement_rate: disagreementRate,
                total: disagreementCount,
              });
            }
          }
        }
      }
    }

    return response;
  }
}
