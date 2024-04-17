import { Controller, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClaudeModel, ClaudeService } from './claude.service';
import { TemperatureEnum } from '../@types/temperatureEnum';

@ApiTags('Claude')
@Controller('claude')
@Controller()
export class ClaudeController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post()
  @ApiQuery({ name: 'model', enum: ClaudeModel })
  @ApiQuery({ name: 'temperature', enum: TemperatureEnum })
  runClaude(
    @Query('model') model: ClaudeModel,
    @Query('prompt') prompt: string,
    @Query('temperature') temperature: TemperatureEnum,
  ) {
    return this.claudeService.runClaude({
      model: model,
      prompt: prompt,
      temperature,
    });
  }
}
