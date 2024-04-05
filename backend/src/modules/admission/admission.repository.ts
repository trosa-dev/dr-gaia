import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdmissionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAdmission(hadm_id: string) {
    return await this.prismaService.admissions.findFirst({
      select: {
        hadm_id: true,
        diagnosis: true,
      },
      where: {
        hadm_id: hadm_id,
      },
    });
  }

  async getAllAdmission() {
    return await this.prismaService.admissions.findMany({
      select: {
        hadm_id: true,
      },
    });
  }

  async getDiagnosesIcd(hadm_id: string) {
    return await this.prismaService.diagnoses_icd.findMany({
      select: {
        hadm_id: true,
        icd9_code: true,
      },
      where: {
        hadm_id: hadm_id,
      },
    });
  }

  async getFormatedIcdDiagnoses(icd9_codes: string[]) {
    return await this.prismaService.d_icd_diagnoses.findMany({
      select: {
        icd9_code: true,
        short_title: true,
        long_title: true,
      },
      where: {
        icd9_code: {
          in: icd9_codes,
        },
      },
    });
  }
}
