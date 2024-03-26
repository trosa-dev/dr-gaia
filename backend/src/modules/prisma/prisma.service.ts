import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { loader_admissions } from './loaders/loader_admissions';
import { loader_callout } from './loaders/loader_callout';
import { loader_caregivers } from './loaders/loader_caregivers';
import { loader_chartevents } from './loaders/loader_chartevents';
import { loader_cptevents } from './loaders/loader_cptevents';
import { loader_d_cpt } from './loaders/loader_d_cpt';
import { loader_d_icd_diagnoses } from './loaders/loader_d_icd_diagnoses';
import { loader_d_icd_procedures } from './loaders/loader_d_icd_procedures';
import { loader_d_items } from './loaders/loader_d_items';

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
      loader_callout({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_caregivers({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_chartevents({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_cptevents({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_d_cpt({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_d_icd_diagnoses({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_d_icd_procedures({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_d_items({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });

      if (loadedDbs.length === 22) {
        this.logger.log('All databases loaded');
        this.logger.log('System is ready for use');
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
