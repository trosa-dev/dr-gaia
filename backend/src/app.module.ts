import { FilesModule } from './modules/file/file.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PromptsModule } from './modules/prompt/prompt.module';
import { GeminiModule } from './modules/gemini/gemini.module';

@Module({
  imports: [PrismaModule, PromptsModule, FilesModule, GeminiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
