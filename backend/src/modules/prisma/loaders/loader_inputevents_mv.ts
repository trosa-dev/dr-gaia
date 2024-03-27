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
  starttime: string;
  endtime: string;
  itemid: string;
  amount: string;
  amountuom: string;
  rate: string;
  rateuom: string;
  storetime: string;
  cgid: string;
  orderid: string;
  linkorderid: string;
  ordercategoryname: string;
  secondaryordercategoryname: string;
  ordercomponenttypedescription: string;
  ordercategorydescription: string;
  patientweight: string;
  totalamount: string;
  totalamountuom: string;
  isopenbag: string;
  continueinnextdept: string;
  cancelreason: string;
  statusdescription: string;
  comments_editedby: string;
  comments_canceledby: string;
  comments_date: string;
  originalamount: string;
  originalrate: string;
}

export async function loader_inputevents_mv(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'inputevents_mv.csv';

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
            await prismaService.inputevents_mv.create({
              data: {
                row_id: data.row_id,
                amount: data.amount,
                amountuom: data.amountuom,
                cancelreason: data.cancelreason,
                cgid: data.cgid,
                comments_canceledby: data.comments_canceledby,
                comments_date: data.comments_date,
                comments_editedby: data.comments_editedby,
                continueinnextdept: data.continueinnextdept,
                endtime: data.endtime,
                hadm_id: data.hadm_id,
                icustay_id: data.icustay_id,
                isopenbag: data.isopenbag,
                itemid: data.itemid,
                linkorderid: data.linkorderid,
                ordercategorydescription: data.ordercategorydescription,
                ordercategoryname: data.ordercategoryname,
                ordercomponenttypedescription:
                  data.ordercomponenttypedescription,
                orderid: data.orderid,
                originalamount: data.originalamount,
                originalrate: data.originalrate,
                patientweight: data.patientweight,
                rate: data.rate,
                rateuom: data.rateuom,
                secondaryordercategoryname: data.secondaryordercategoryname,
                starttime: data.starttime,
                statusdescription: data.statusdescription,
                storetime: data.storetime,
                subject_id: data.subject_id,
                totalamount: data.totalamount,
                totalamountuom: data.totalamountuom,
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
