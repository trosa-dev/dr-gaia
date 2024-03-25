import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  concept_id: string;
  concept_name: string;
  domain_id: string;
  vocabulary_id: string;
  concept_class_id: string;
  standard_concept: string;
  concept_code: string;
  valid_start_DATE: string;
  valid_end_DATE: string;
  invalid_reason: string;
}

export async function loader_2b_concept(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = '2b_concept.csv';

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
            await prismaService.concept_2b.create({
              data: {
                concept_id: data.concept_id,
                concept_name: data.concept_name,
                domain_id: data.domain_id,
                vocabulary_id: data.vocabulary_id,
                concept_class_id: data.concept_class_id,
                standard_concept: data.standard_concept,
                concept_code: data.concept_code,
                valid_start_date: data.valid_start_DATE,
                valid_end_date: data.valid_end_DATE,
                invalid_reason: data.invalid_reason,
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
