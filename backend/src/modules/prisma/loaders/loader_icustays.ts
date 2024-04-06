import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  row_id: string;
  subject_id: string;
  hadm_id: string;
  icustay_id: string;
  dbsource: string;
  first_careunit: string;
  last_careunit: string;
  first_wardid: string;
  last_wardid: string;
  intime: string;
  outtime: string;
  los: string;
}

export async function loader_icustays(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'icustays.csv';

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
            await prismaService.icustays.create({
              data: {
                row_id: data.row_id,
                dbsource: data.dbsource,
                first_careunit: data.first_careunit,
                first_wardid: data.first_wardid,
                hadm_id: data.hadm_id,
                icustay_id: data.icustay_id,
                intime: data.intime,
                last_careunit: data.last_careunit,
                last_wardid: data.last_wardid,
                los: data.los,
                outtime: data.outtime,
                subject_id: data.subject_id,
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
              `${loadedDbs.length.toString().padStart(2, '0')}/26: database loaded - ${csvId}`,
            );
          } catch (error) {
            logger.error(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
