import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdmissionService } from './admission.service';

@ApiTags('Admission')
@Controller('admission')
@Controller()
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Get()
  async getAdmission(@Query('hadm_id') hadm_id: string) {
    return this.admissionService.getAdmission(hadm_id);
  }
}
