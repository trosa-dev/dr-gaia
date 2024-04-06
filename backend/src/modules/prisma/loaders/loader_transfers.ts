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
  eventtype: string;
  prev_careunit: string;
  curr_careunit: string;
  prev_wardid: string;
  curr_wardid: string;
  intime: string;
  outtime: string;
  los: string;
}

export async function loader_transfers(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'transfers.csv';

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
            await prismaService.transfers.create({
              data: {
                row_id: data.row_id,
                curr_careunit: data.curr_careunit,
                curr_wardid: data.curr_wardid,
                dbsource: data.dbsource,
                eventtype: data.eventtype,
                hadm_id: data.hadm_id,
                icustay_id: data.icustay_id,
                intime: data.intime,
                los: data.los,
                outtime: data.outtime,
                prev_careunit: data.prev_careunit,
                prev_wardid: data.prev_wardid,
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
