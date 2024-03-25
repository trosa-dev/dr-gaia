import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  observation_id: string;
  person_id: string;
  observation_concept_id: string;
  observation_date: string;
  observation_datetime: string;
  observation_type_concept_id: string;
  value_as_number: string;
  value_as_string: string;
  value_as_concept_id: string;
  qualifier_concept_id: string;
  unit_concept_id: string;
  provider_id: string;
  visit_occurrence_id: string;
  visit_detail_id: string;
  observation_source_value: string;
  observation_source_concept_id: string;
  unit_source_value: string;
  qualifier_source_value: string;
}

export async function loader_observation(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'observation.csv';

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
            await prismaService.observation.create({
              data: {
                observation_concept_id: data.observation_concept_id,
                observation_date: data.observation_date,
                observation_datetime: data.observation_datetime,
                observation_id: data.observation_id,
                observation_source_concept_id:
                  data.observation_source_concept_id,
                observation_source_value: data.observation_source_value,
                observation_type_concept_id: data.observation_type_concept_id,
                person_id: data.person_id,
                provider_id: data.provider_id,
                qualifier_concept_id: data.qualifier_concept_id,
                qualifier_source_value: data.qualifier_source_value,
                unit_concept_id: data.unit_concept_id,
                unit_source_value: data.unit_source_value,
                value_as_concept_id: data.value_as_concept_id,
                value_as_number: data.value_as_number,
                value_as_string: data.value_as_string,
                visit_detail_id: data.visit_detail_id,
                visit_occurrence_id: data.visit_occurrence_id,
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
