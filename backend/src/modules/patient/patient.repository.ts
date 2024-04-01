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
      },
      where: {
        subject_id: subject_id,
      },
    });
  }
}
