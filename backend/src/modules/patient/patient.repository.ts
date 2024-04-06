import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getPatient(subject_id: string) {
    return await this.prismaService.patients.findFirst({
      select: {
        subject_id: true,
        gender: true,
        dob: true,
        dod: true,
        dod_hosp: true,
        dod_ssn: true,
        expire_flag: true,
      },
      where: {
        subject_id: subject_id,
      },
    });
  }

  async getDiagnosis(subject_id: string) {
    return await this.prismaService.diagnoses_icd.findMany({
      select: {
        subject_id: true,
        hadm_id: true,
        icd9_code: true,
        seq_num: true,
      },
      where: {
        subject_id: subject_id,
      },
    });
  }

  async getHospitalAdmissions(hadm_id: string) {
    return await this.prismaService.admissions.findFirst({
      select: {
        subject_id: true,
        hadm_id: true,
        admission_location: true,
        admission_type: true,
        admittime: true,
        deathtime: true,
        diagnosis: true,
        discharge_location: true,
        dischtime: true,
        edouttime: true,
        edregtime: true,
        ethnicity: true,
        has_chartevents_data: true,
        hospital_expire_flag: true,
        insurance: true,
        language: true,
        marital_status: true,
        religion: true,
      },
      where: {
        hadm_id: hadm_id,
      },
    });
  }

  async getDIdc9Code(icd9_code: string) {
    return await this.prismaService.d_icd_diagnoses.findFirst({
      select: {
        icd9_code: true,
        long_title: true,
        short_title: true,
      },
      where: {
        icd9_code: icd9_code,
      },
    });
  }

  async getChartEvents(hadm_id: string) {
    return await this.prismaService.chartevents.findMany({
      select: {
        cgid: true,
        charttime: true,
        error: true,
        hadm_id: true,
        icustay_id: true,
        id: true,
        itemid: true,
        resultstatus: true,
        stopped: true,
        storetime: true,
        value: true,
        valuenum: true,
        valueuom: true,
        warning: true,
      },
      where: {
        hadm_id: hadm_id,
      },
    });
  }
}
