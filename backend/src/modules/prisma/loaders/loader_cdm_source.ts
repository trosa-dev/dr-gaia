import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  cdm_source_name: string;
  cdm_source_abbreviation: string;
  cdm_holder: string;
  source_description: string;
  source_documentation_reference: string;
  cdm_etl_reference: string;
  source_release_date: string;
  cdm_release_date: string;
  cdm_version: string;
  vocabulary_version: string;
}

export async function loader_cdm_source(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'cdm_source.csv';

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
            await prismaService.cdm_source.create({
              data: {
                cdm_etl_reference: data.cdm_etl_reference,
                cdm_holder: data.cdm_holder,
                cdm_release_date: data.cdm_release_date,
                cdm_source_abbreviation: data.cdm_source_abbreviation,
                cdm_source_name: data.cdm_source_name,
                cdm_version: data.cdm_version,
                source_description: data.source_description,
                source_documentation_reference:
                  data.source_documentation_reference,
                source_release_date: data.source_release_date,
                vocabulary_version: data.vocabulary_version,
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
