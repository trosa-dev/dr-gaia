import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { loader_2b_concept_relationship } from './loaders/loader_2b_concept_relationship';
import { loader_2b_concept } from './loaders/loader_2b_concept';
import { loader_2b_vocabulary } from './loaders/loader_2b_vocabulary';
import { loader_care_site } from './loaders/loader_care_site';
import { loader_cdm_source } from './loaders/loader_cdm_source';
import { loader_condition_era } from './loaders/loader_condition_era';
import { loader_condition_occurrence } from './loaders/loader_condition_occurrence.';
import { loader_death } from './loaders/loader_death';
import { loader_device_exposure } from './loaders/loader_device_exposure';
import { loader_dose_era } from './loaders/loader_dose_era';
import { loader_drug_era } from './loaders/loader_drug_era';
import { loader_drug_exposure } from './loaders/loader_drug_exposure';
import { loader_fact_relationship } from './loaders/loader_fact_relationship';
import { loader_location } from './loaders/loader_location';
import { loader_measurement } from './loaders/loader_measurement';
import { loader_observation_period } from './loaders/loader_observation_period';
import { loader_observation } from './loaders/loader_observation';
import { loader_person } from './loaders/loader_person';
import { loader_procedure_occurrence } from './loaders/loader_procedure_occurrence';
import { loader_specimen } from './loaders/loader_specimen';

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
      //loader not needed for cohort_attribute.csv - no data
      //loader not needed for cohort_definition.csv - no data
      //loader not needed for cohort.csv - no data
      loader_condition_era({ prismaService: this });
      loader_condition_occurrence({ prismaService: this });
      //loader not needed for cost.csv - no data
      loader_death({ prismaService: this });
      loader_device_exposure({ prismaService: this });
      loader_dose_era({ prismaService: this });
      loader_drug_era({ prismaService: this });
      loader_drug_exposure({ prismaService: this });
      loader_fact_relationship({ prismaService: this });
      loader_location({ prismaService: this });
      loader_measurement({ prismaService: this });
      //loader not needed for metadata.csv - no data
      //loader not needed for note_nlp.csv - no data
      //loader not needed for note.csv - no data
      loader_observation_period({ prismaService: this });
      loader_observation({ prismaService: this });
      //loader not needed for payer_plan_period.csv - no data
      loader_person({ prismaService: this });
      loader_procedure_occurrence({ prismaService: this });
      //loader not needed for provider.csv - no data
      loader_specimen({ prismaService: this });
    } catch (error) {
      console.log(error);
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
