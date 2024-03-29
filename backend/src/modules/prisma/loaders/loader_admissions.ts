import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  row_id: string;
  subject_id: string;
  hadm_id: string;
  admittime: string;
  dischtime: string;
  deathtime: string;
  admission_type: string;
  admission_location: string;
  discharge_location: string;
  insurance: string;
  language: string;
  religion: string;
  marital_status: string;
  ethnicity: string;
  edregtime: string;
  edouttime: string;
  diagnosis: string;
  hospital_expire_flag: string;
  has_chartevents_data: string;
}

export async function loader_admissions(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'admissions.csv';

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
            await prismaService.admissions.create({
              data: {
                row_id: data.row_id,
                admission_location: data.admission_location,
                admission_type: data.admission_type,
                admittime: data.admittime,
                deathtime: data.deathtime,
                diagnosis: data.diagnosis,
                discharge_location: data.discharge_location,
                dischtime: data.dischtime,
                edouttime: data.edouttime,
                edregtime: data.edregtime,
                ethnicity: data.ethnicity,
                hadm_id: data.hadm_id,
                has_chartevents_data: data.has_chartevents_data,
                hospital_expire_flag: data.hospital_expire_flag,
                insurance: data.insurance,
                language: data.language,
                marital_status: data.marital_status,
                religion: data.religion,
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
