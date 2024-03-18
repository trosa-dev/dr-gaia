import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { loader_concept_relationship_2b } from './loader/loader';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    loader_concept_relationship_2b({ prismaService: this });
  }
}
