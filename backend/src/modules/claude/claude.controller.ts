import { Controller, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClaudeModel, ClaudeService } from './claude.service';

@ApiTags('Claude')
@Controller('claude')
@Controller()
export class ClaudeController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post()
  @ApiQuery({ name: 'model', enum: ClaudeModel })
  runClaude(
    @Query('model') model: ClaudeModel,
    @Query('prompt') prompt: string,
  ) {
    return this.claudeService.runClaude({ model: model, prompt: prompt });
  }
}
