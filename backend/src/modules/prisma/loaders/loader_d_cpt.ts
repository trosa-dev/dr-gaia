import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  row_id: string;
  category: string;
  sectionrange: string;
  sectionheader: string;
  subsectionrange: string;
  subsectionheader: string;
  codesuffix: string;
  mincodeinsubsection: string;
  maxcodeinsubsection: string;
}

export async function loader_d_cpt(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'd_cpt.csv';

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
            await prismaService.d_cpt.create({
              data: {
                row_id: data.row_id,
                category: data.category,
                codesuffix: data.codesuffix,
                maxcodeinsubsection: data.maxcodeinsubsection,
                mincodeinsubsection: data.mincodeinsubsection,
                sectionheader: data.sectionheader,
                sectionrange: data.sectionrange,
                subsectionheader: data.subsectionheader,
                subsectionrange: data.subsectionrange,
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
