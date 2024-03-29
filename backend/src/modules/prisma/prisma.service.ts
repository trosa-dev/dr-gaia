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
import { loader_d_labitems } from './loaders/loader_d_labitems';
import { loader_datetimeevents } from './loaders/loader_datetimeevents';
import { loader_diagnoses_icd } from './loaders/loader_diagnoses_icd';
import { loader_drgcodes } from './loaders/loader_drgcodes';
import { loader_icustays } from './loaders/loader_icustays';
import { loader_inputevents_cv } from './loaders/loader_inputevents_cv';
import { loader_inputevents_mv } from './loaders/loader_inputevents_mv';
import { loader_labevents } from './loaders/loader_labevents';
import { loader_microbiologyevents } from './loaders/loader_microbiologyevents';
import { loader_noteevents } from './loaders/loader_noteevents';
import { loader_outputevents } from './loaders/loader_outputevents';
import { loader_patients } from './loaders/loader_patients';
import { loader_prescriptions } from './loaders/loader_prescriptions';
import { loader_procedureevents_mv } from './loaders/loader_procedureevents_mv';
import { loader_procedures_icd } from './loaders/loader_procedures_icd';
import { loader_services } from './loaders/loader_services';
import { loader_transfers } from './loaders/loader_transfers';

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
      loader_d_labitems({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_datetimeevents({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_diagnoses_icd({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_drgcodes({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_icustays({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_inputevents_cv({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_inputevents_mv({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_labevents({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_microbiologyevents({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_noteevents({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_outputevents({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_patients({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_prescriptions({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_procedureevents_mv({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_procedures_icd({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_services({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });
      loader_transfers({
        prismaService: this,
        logger: this.logger,
        loadedDbs,
      });

      if (loadedDbs.length === 26) {
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
