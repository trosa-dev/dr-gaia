import { PromptsModule } from '../prompt/prompt.module';
import { ClaudeController } from './claude.controller';
import { ClaudeService } from './claude.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PromptsModule],
  controllers: [ClaudeController],
  providers: [ClaudeService],
  exports: [ClaudeService],
})
export class ClaudeModule {}
