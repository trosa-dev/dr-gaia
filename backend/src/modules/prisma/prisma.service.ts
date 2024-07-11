import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { loader_admissions } from './loaders/loader_admissions';
import { loader_patients } from './loaders/loader_patients';
import { loader_diagnoses_icd } from './loaders/loader_diagnoses_icd';
import { loader_d_icd_diagnoses } from './loaders/loader_d_icd_diagnoses';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  private readonly logger = new Logger('DrGaia');

  async onModuleInit() {
    try {
      await this.$connect();

      this.logger.log('Connected to database successfully.');
      this.logger.warn('Loading database tables. This may take a while...');
      this.logger.log('Starting data loading process.');

      const loadedDbs = [];

      loader_admissions({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_patients({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_diagnoses_icd({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_d_icd_diagnoses({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });

      if (loadedDbs.length === 4) {
        this.logger.log('All databases loaded');
        this.logger.log('System is ready for use');
        return;
      }

      const countLoaders = await this.loader.count();
      if (countLoaders === 4) {
        this.logger.log('All databases loaded');
        this.logger.log('System is ready for use');
        return;
      } else {
        this.logger.error('Something went wrong loading databases');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
