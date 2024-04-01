import { Module } from '@nestjs/common';
import { OpenaiModule } from './openai/openai.module';
import { GeminiModule } from './gemini/gemini.module';
import { ClaudeModule } from './claude/claude.module';

@Module({
  imports: [OpenaiModule, GeminiModule, ClaudeModule],
  controllers: [],
  providers: [],
  exports: [OpenaiModule, GeminiModule, ClaudeModule],
})
export class GenerativeIAsModule {}
