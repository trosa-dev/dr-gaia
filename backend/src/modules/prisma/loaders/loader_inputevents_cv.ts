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
  amount: string;
  amountuom;
  rate: string;
  rateuom: string;
  storetime: string;
  cgid: string;
  orderid: string;
  linkorderid: string;
  stopped: string;
  newbottle: string;
  originalamount: string;
  originalamountuom: string;
  originalroute: string;
  originalrate: string;
  originalrateuom: string;
  originalsite: string;
}

export async function loader_inputevents_cv(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'inputevents_cv.csv';

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
            await prismaService.inputevents_cv.create({
              data: {
                row_id: data.row_id,
                amount: data.amount,
                amountuom: data.amountuom,
                cgid: data.cgid,
                charttime: data.charttime,
                hadm_id: data.hadm_id,
                icustay_id: data.icustay_id,
                itemid: data.itemid,
                linkorderid: data.linkorderid,
                newbottle: data.newbottle,
                orderid: data.orderid,
                originalamount: data.originalamount,
                originalamountuom: data.originalamountuom,
                originalrate: data.originalrate,
                originalrateuom: data.originalrateuom,
                originalroute: data.originalroute,
                originalsite: data.originalsite,
                rate: data.rate,
                rateuom: data.rateuom,
                stopped: data.stopped,
                storetime: data.storetime,
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
