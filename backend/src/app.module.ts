import { FilesModule } from './modules/file/file.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PromptsModule } from './modules/prompt/prompt.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { ClaudeModule } from './modules/claude/claude.module';
import { OpenaiModule } from './modules/openai/openai.module';

@Module({
  imports: [
    PrismaModule,
    PromptsModule,
    FilesModule,
    GeminiModule,
    ClaudeModule,
    OpenaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
