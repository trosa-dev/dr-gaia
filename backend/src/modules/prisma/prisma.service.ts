import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { loader_2b_concept_relationship } from './loaders/loader_2b_concept_relationship';
import { loader_2b_concept } from './loaders/loader_2b_concept';
import { loader_2b_vocabulary } from './loaders/loader_2b_vocabulary';
import { loader_care_site } from './loaders/loader_care_site';
import { loader_cdm_source } from './loaders/loader_cdm_source';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  private readonly logger = new Logger('DrGaia: ');

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to database successfully.');

      // Adding a delay of 10 seconds
      this.logger.log('Loading database tables. This may take a while...');
      await this.delay(10000);

      this.logger.log('Starting data loading process.');

      loader_2b_concept_relationship({ prismaService: this });
      loader_2b_concept({ prismaService: this });
      loader_2b_vocabulary({ prismaService: this });
      //loader not needed for attribute_definition.csv - no data
      loader_care_site({ prismaService: this });
      loader_cdm_source({ prismaService: this });
    } catch (error) {
      console.log(error);
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
