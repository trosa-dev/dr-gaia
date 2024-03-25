import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  person_id: string;
  gender_concept_id: string;
  year_of_birth: string;
  month_of_birth: string;
  day_of_birth: string;
  birth_datetime: string;
  race_concept_id: string;
  ethnicity_concept_id: string;
  location_id: string;
  provider_id: string;
  care_site_id: string;
  person_source_value: string;
  gender_source_value: string;
  gender_source_concept_id: string;
  race_source_value: string;
  race_source_concept_id: string;
  ethnicity_source_value: string;
  ethnicity_source_concept_id: string;
}

export async function loader_person(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'person.csv';

  const filePath = path.resolve(
    __dirname,
    `../../../../mimic-demo-files/csv/${csvId}`,
  );

  csvIsLoaded = await prismaService.loader.findUnique({
    where: { id: csvId },
  });

  if (!csvIsLoaded) {
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (data: CsvData) => {
          try {
            await prismaService.person.create({
              data: {
                birth_datetime: data.birth_datetime,
                care_site_id: data.care_site_id,
                day_of_birth: data.day_of_birth,
                ethnicity_concept_id: data.ethnicity_concept_id,
                ethnicity_source_concept_id: data.ethnicity_source_concept_id,
                ethnicity_source_value: data.ethnicity_source_value,
                gender_concept_id: data.gender_concept_id,
                gender_source_concept_id: data.gender_source_concept_id,
                gender_source_value: data.gender_source_value,
                location_id: data.location_id,
                month_of_birth: data.month_of_birth,
                person_id: data.person_id,
                person_source_value: data.person_source_value,
                provider_id: data.provider_id,
                race_concept_id: data.race_concept_id,
                race_source_concept_id: data.race_source_concept_id,
                race_source_value: data.race_source_value,
                year_of_birth: data.year_of_birth,
              },
            });
          } catch (error) {
            logger.error(error);
          }
        })
        .on('end', async () => {
          try {
            await prismaService.loader.create({ data: { id: csvId } });

            loadedDbs.push(csvId);

            logger.warn(
              `${loadedDbs.length.toString().padStart(2, '0')}/22: database loaded - ${csvId}`,
            );

            if (loadedDbs.length === 22) {
              logger.log('System is ready for use');
            }
          } catch (error) {
            logger.error(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  return true;
}
