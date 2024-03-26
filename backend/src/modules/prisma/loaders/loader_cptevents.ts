import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  row_id: string;
  subject_id: string;
  hadm_id: string;
  costcenter: string;
  chartdate: string;
  cpt_cd: string;
  cpt_number: string;
  cpt_suffix: string;
  ticket_id_seq: string;
  sectionheader: string;
  subsectionheader: string;
  description: string;
}

export async function loader_cptevents(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'cptevents.csv';

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
            await prismaService.cptevents.create({
              data: {
                row_id: data.row_id,
                chartdate: data.chartdate,
                costcenter: data.costcenter,
                cpt_cd: data.cpt_cd,
                cpt_number: data.cpt_number,
                cpt_suffix: data.cpt_suffix,
                description: data.description,
                hadm_id: data.hadm_id,
                sectionheader: data.sectionheader,
                subject_id: data.subject_id,
                subsectionheader: data.subsectionheader,
                ticket_id_seq: data.ticket_id_seq,
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
}
