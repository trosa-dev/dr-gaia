import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClaudeService } from './claude.service';

@ApiTags('Claude')
@Controller('claude')
@Controller()
export class ClaudeController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post()
  getListOfFiles() {
    return this.claudeService.callClaude();
  }
}
