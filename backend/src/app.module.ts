import { PrismaModule } from './modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PromptsModule } from './modules/prompt/prompt.module';

@Module({
  imports: [PrismaModule, PromptsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
