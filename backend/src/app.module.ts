import { FilesModule } from './modules/file/file.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PromptsModule } from './modules/prompt/prompt.module';
import { GenerativeIAsModule } from './modules/generativeIAs/generativeIAs.module';

@Module({
  imports: [PrismaModule, PromptsModule, FilesModule, GenerativeIAsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
