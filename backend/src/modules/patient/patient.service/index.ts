import { PatientRepository } from '../patient.repository';
import { Injectable } from '@nestjs/common';
import { handleGender } from './functions/handleGender';
import { handleDiagnosis } from './functions/handleDiagnosis';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async getPatient(subject_id: string) {
    const patient = await this.patientRepository.getPatient(subject_id);

    const gender = handleGender(patient.gender);

    const diagnosis = await handleDiagnosis({
      patientRepository: this.patientRepository,
      subject_id,
    });

    return {
      subject_id: patient.subject_id,
      gender,
      diagnosis: diagnosis,
    };
  }
}
