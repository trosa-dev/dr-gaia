import { GeminiModel, GeminiService } from './gemini.service';
import { Controller, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Gemini')
@Controller('gemini')
@Controller()
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  @ApiQuery({ name: 'model', enum: GeminiModel })
  runGemini(
    @Query('model') model: GeminiModel,
    @Query('prompt') prompt: string,
  ) {
    return this.geminiService.runGemini({ model: model, prompt: prompt });
  }
}
