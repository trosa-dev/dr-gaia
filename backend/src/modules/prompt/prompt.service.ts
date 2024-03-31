import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PromptService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly logger = new Logger('DrGaia');

  async onModuleInit() {
    try {
      let prompt = '';
      const filePath = path.resolve(`src/modules/prompt/prompt.txt`);

      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.log(filePath);
          this.logger.error('Error reading file', err);
          return;
        }

        prompt = JSON.stringify(data);
      });

      const doesPromptExist = await this.prismaService.prompt.findMany({
        where: {
          prompt: prompt,
        },
      });

      if (doesPromptExist.length === 0) {
        await this.prismaService.prompt.create({
          data: {
            prompt: prompt,
            date: new Date(),
          },
        });

        this.logger.warn('A new prompt is being used');
        this.logger.warn('Prompt saved at database');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
