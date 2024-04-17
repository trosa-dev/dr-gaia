import { Controller, Query, Post } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RunService } from './run.service';
import { TemperatureEnum } from '../generativeIAs/@types/temperatureEnum';

@ApiTags('Run')
@Controller('run')
@Controller()
export class RunController {
  constructor(private readonly runService: RunService) {}

  @ApiQuery({ name: 'temperature', enum: TemperatureEnum })
  @Post()
  async run(
    @Query('run_id') run_id: string,
    @Query('temperature') temperature: TemperatureEnum,
  ) {
    this.runService.run({
      run_id,
      temperature,
    });

    return 'Application is running, follow terminal for real time information';
  }
}
