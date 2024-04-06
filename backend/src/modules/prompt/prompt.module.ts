import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [PromptService],
  exports: [PromptService],
})
export class PromptsModule {}
