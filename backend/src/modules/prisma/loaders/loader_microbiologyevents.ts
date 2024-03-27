import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  row_id: string;
  subject_id: string;
  hadm_id: string;
  chartdate: string;
  charttime: string;
  spec_itemid: string;
  spec_type_desc: string;
  org_itemid: string;
  org_name: string;
  isolate_num: string;
  ab_itemid: string;
  ab_name: string;
  dilution_text: string;
  dilution_comparison: string;
  dilution_value: string;
  interpretation: string;
}

export async function loader_microbiologyevents(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'microbiologyevents.csv';

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
            await prismaService.microbiologyevents.create({
              data: {
                row_id: data.row_id,
                ab_itemid: data.ab_itemid,
                ab_name: data.ab_name,
                chartdate: data.chartdate,
                charttime: data.charttime,
                dilution_comparison: data.dilution_comparison,
                dilution_text: data.dilution_text,
                dilution_value: data.dilution_value,
                hadm_id: data.hadm_id,
                interpretation: data.interpretation,
                isolate_num: data.isolate_num,
                org_itemid: data.org_itemid,
                org_name: data.org_name,
                spec_itemid: data.spec_itemid,
                spec_type_desc: data.spec_type_desc,
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
