import { Injectable } from '@nestjs/common';
import { AdmissionRepository } from '../admission.repository';

@Injectable()
export class AdmissionService {
  constructor(private readonly admissionRepository: AdmissionRepository) {}

  async getAdmission(hadm_id: string) {
    const admission = await this.admissionRepository.getAdmission(hadm_id);

    const icdCodesbyAdmission =
      await this.admissionRepository.getDiagnosesIcd(hadm_id);

    const uniqueIcdCodes = new Set(
      icdCodesbyAdmission.map((item) => item.icd9_code),
    );

    const formatedIcd = await this.admissionRepository.getFormatedIcdDiagnoses([
      ...uniqueIcdCodes,
    ]);

    return {
      ...admission,
      diagnosticos: formatedIcd,
    };
  }
}
