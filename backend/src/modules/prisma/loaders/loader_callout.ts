import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  row_id: string;
  subject_id: string;
  hadm_id: string;
  submit_wardid: string;
  submit_careunit: string;
  curr_wardid: string;
  curr_careunit: string;
  callout_wardid: string;
  callout_service: string;
  request_tele: string;
  request_resp: string;
  request_cdiff: string;
  request_mrsa: string;
  request_vre: string;
  callout_status: string;
  callout_outcome: string;
  discharge_wardid: string;
  acknowledge_status: string;
  createtime: string;
  updatetime: string;
  acknowledgetime: string;
  outcometime: string;
  firstreservationtime: string;
  currentreservationtime: string;
}

export async function loader_callout(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'callout.csv';

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
            await prismaService.callout.create({
              data: {
                row_id: data.row_id,
                acknowledge_status: data.acknowledge_status,
                acknowledgetime: data.acknowledgetime,
                callout_outcome: data.callout_outcome,
                callout_service: data.callout_service,
                callout_status: data.callout_status,
                callout_wardid: data.callout_wardid,
                createtime: data.createtime,
                curr_careunit: data.curr_careunit,
                curr_wardid: data.curr_wardid,
                currentreservationtime: data.currentreservationtime,
                discharge_wardid: data.discharge_wardid,
                firstreservationtime: data.firstreservationtime,
                hadm_id: data.hadm_id,
                outcometime: data.outcometime,
                request_cdiff: data.request_cdiff,
                request_mrsa: data.request_mrsa,
                request_resp: data.request_resp,
                request_tele: data.request_tele,
                request_vre: data.request_vre,
                subject_id: data.subject_id,
                submit_careunit: data.submit_careunit,
                submit_wardid: data.submit_wardid,
                updatetime: data.updatetime,
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
