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
  startdate: string;
  enddate: string;
  drug_type: string;
  drug: string;
  drug_name_poe: string;
  drug_name_generic: string;
  formulary_drug_cd: string;
  gsn: string;
  ndc: string;
  prod_strength: string;
  dose_val_rx: string;
  dose_unit_rx: string;
  form_val_disp: string;
  form_unit_disp: string;
  route: string;
}

export async function loader_prescriptions(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'prescriptions.csv';

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
            await prismaService.prescriptions.create({
              data: {
                row_id: data.row_id,
                dose_unit_rx: data.dose_unit_rx,
                dose_val_rx: data.dose_val_rx,
                drug: data.drug,
                drug_name_generic: data.drug_name_generic,
                drug_name_poe: data.drug_name_poe,
                drug_type: data.drug_type,
                enddate: data.enddate,
                form_unit_disp: data.form_unit_disp,
                form_val_disp: data.form_val_disp,
                formulary_drug_cd: data.formulary_drug_cd,
                gsn: data.gsn,
                hadm_id: data.hadm_id,
                icustay_id: data.icustay_id,
                ndc: data.ndc,
                prod_strength: data.prod_strength,
                route: data.route,
                startdate: data.startdate,
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
