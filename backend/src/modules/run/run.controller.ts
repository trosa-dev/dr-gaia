import { Controller, Query, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RunService } from './run.service';

@ApiTags('Run')
@Controller('run')
@Controller()
export class RunController {
  constructor(private readonly runService: RunService) {}

  @Post()
  async run(@Query('run_id') run_id: string, @Query('prompt') prompt: string) {
    return await this.runService.run({ run_id, prompt });
  }
}
