import { ClaudeController } from './claude.controller';
import { ClaudeService } from './claude.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ClaudeController],
  providers: [ClaudeService],
  exports: [ClaudeService],
})
export class ClaudeModule {}
