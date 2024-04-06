import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';

@ApiTags('Patient')
@Controller('patient')
@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async getPatient(@Query('subject_id') subject_id: string) {
    return await this.patientService.getPatient(subject_id);
  }
}
