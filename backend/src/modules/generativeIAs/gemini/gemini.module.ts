import { HttpModule } from '@nestjs/axios';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [GeminiController],
  providers: [GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {}
