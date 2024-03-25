import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  device_exposure_id: string;
  person_id: string;
  device_concept_id: string;
  device_exposure_start_date: string;
  device_exposure_start_datetime: string;
  device_exposure_end_date: string;
  device_exposure_end_datetime: string;
  device_type_concept_id: string;
  unique_device_id: string;
  quantity: string;
  provider_id: string;
  visit_occurrence_id: string;
  visit_detail_id: string;
  device_source_value: string;
  device_source_concept_id: string;
}

export async function loader_device_exposure(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'device_exposure.csv';

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
            await prismaService.device_exposure.create({
              data: {
                device_concept_id: data.device_concept_id,
                device_exposure_end_date: data.device_exposure_end_date,
                device_exposure_end_datetime: data.device_exposure_end_datetime,
                device_exposure_id: data.device_exposure_id,
                device_exposure_start_date: data.device_exposure_start_date,
                device_exposure_start_datetime:
                  data.device_exposure_start_datetime,
                device_source_concept_id: data.device_source_concept_id,
                device_source_value: data.device_source_value,
                device_type_concept_id: data.device_type_concept_id,
                person_id: data.person_id,
                provider_id: data.provider_id,
                quantity: data.quantity,
                unique_device_id: data.unique_device_id,
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
