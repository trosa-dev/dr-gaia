import { Module } from '@nestjs/common';
import { AdmissionRepository } from './admission.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AdmissionController],
  providers: [AdmissionService, AdmissionRepository],
  exports: [AdmissionService, AdmissionRepository],
})
export class AdmissionModule {}
