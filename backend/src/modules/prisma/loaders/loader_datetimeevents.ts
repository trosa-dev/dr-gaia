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
  itemid: string;
  charttime: string;
  storetime: string;
  cgid: string;
  value: string;
  valueuom: string;
  warning: string;
  error: string;
  resultstatus: string;
  stopped: string;
}

export async function loader_datetimeevents(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'datetimeevents.csv';

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
            await prismaService.datetimeevents.create({
              data: {
                row_id: data.row_id,
                cgid: data.cgid,
                charttime: data.charttime,
                error: data.error,
                hadm_id: data.hadm_id,
                icustay_id: data.icustay_id,
                itemid: data.itemid,
                resultstatus: data.resultstatus,
                stopped: data.stopped,
                storetime: data.storetime,
                subject_id: data.subject_id,
                value: data.value,
                valueuom: data.valueuom,
                warning: data.warning,
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
}
