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
  charttime: string;
  itemid: string;
  value: string;
  valueuom: string;
  storetime: string;
  cgid: string;
  stopped: string;
  newbottle: string;
  iserror: string;
}

export async function loader_outputevents(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'outputevents.csv';

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
            await prismaService.outputevents.create({
              data: {
                row_id: data.row_id,
                cgid: data.cgid,
                charttime: data.charttime,
                hadm_id: data.hadm_id,
                icustay_id: data.icustay_id,
                iserror: data.iserror,
                itemid: data.itemid,
                newbottle: data.newbottle,
                stopped: data.stopped,
                storetime: data.storetime,
                subject_id: data.subject_id,
                value: data.value,
                valueuom: data.valueuom,
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
