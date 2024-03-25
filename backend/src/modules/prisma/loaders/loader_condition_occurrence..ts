import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  condition_occurrence_id: string;
  person_id: string;
  condition_concept_id: string;
  condition_start_date: string;
  condition_start_datetime: string;
  condition_end_date: string;
  condition_end_datetime: string;
  condition_type_concept_id: string;
  stop_reason: string;
  provider_id: string;
  visit_occurrence_id: string;
  visit_detail_id: string;
  condition_source_value: string;
  condition_source_concept_id: string;
  condition_status_source_value: string;
  condition_status_concept_id: string;
}

export async function loader_condition_occurrence(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'condition_occurrence.csv';

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
            await prismaService.condition_occurrence.create({
              data: {
                condition_concept_id: data.condition_concept_id,
                condition_end_date: data.condition_end_date,
                condition_end_datetime: data.condition_end_datetime,
                condition_occurrence_id: data.condition_occurrence_id,
                condition_source_concept_id: data.condition_source_concept_id,
                condition_source_value: data.condition_source_value,
                condition_start_date: data.condition_start_date,
                condition_start_datetime: data.condition_start_datetime,
                condition_status_concept_id: data.condition_status_concept_id,
                condition_status_source_value:
                  data.condition_status_source_value,
                condition_type_concept_id: data.condition_type_concept_id,
                person_id: data.person_id,
                provider_id: data.provider_id,
                stop_reason: data.stop_reason,
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
