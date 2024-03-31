import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OpenaiService } from './openai.service';

@ApiTags('OpenAi')
@Controller('openai')
@Controller()
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  getListOfFiles() {
    return this.openaiService.callOpenai();
  }
}
