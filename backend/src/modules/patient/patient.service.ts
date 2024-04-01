import { PatientRepository } from './patient.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async getPatient(subject_id: string) {
    const patient = this.patientRepository.getPatient(subject_id);

    return patient;

    /*const patient = await this.prismaService.patients.findFirst({
      select: {
        subject_id: true,
        gender: true,
      },
      where: {
        subject_id: subject_id,
      },
    });

    const diagnosis = await this.prismaService.diagnoses_icd.findMany({
      select: {
        hadm_id: true,
        icd9_code: true,
        seq_num: true,
      },
      where: {
        subject_id: subject_id,
      },
    });

    const icd9_codes = diagnosis.map((diagnostic) => diagnostic.icd9_code);
    const uniqueIcd9_codes = new Set(icd9_codes);

    const teste = await this.prismaService.d_icd_diagnoses.findMany({
      select: {
        icd9_code: true,
        short_title: true,
        long_title: true,
      },
      where: {
        icd9_code: {
          in: [...uniqueIcd9_codes],
        },
      },
    });

    return { ...patient, diagnosis, teste };*/
  }
}
