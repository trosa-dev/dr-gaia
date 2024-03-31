import { GeminiService } from './gemini.service';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Gemini')
@Controller('gemini')
@Controller()
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  getListOfFiles() {
    return this.geminiService.callGemini();
  }
}
