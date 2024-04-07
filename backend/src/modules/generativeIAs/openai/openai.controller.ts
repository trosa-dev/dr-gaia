import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { OpenaiModel, OpenaiService } from './openai.service';

@ApiTags('OpenAi')
@Controller('openai')
@Controller()
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('models')
  getModels() {
    return this.openaiService.getModels();
  }

  @Post()
  @ApiQuery({ name: 'model', enum: OpenaiModel })
  runOpenai(
    @Query('model') model: OpenaiModel,
    @Query('prompt') prompt: string,
    @Query('temperature') temperature: string,
  ) {
    return this.openaiService.runOpenai({
      model: model,
      prompt: prompt,
      temperature: Number(temperature),
    });
  }
}
