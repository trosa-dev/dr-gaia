import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { Logger } from '@nestjs/common';

interface CsvData {
  drug_exposure_id: string;
  person_id: string;
  drug_concept_id: string;
  drug_exposure_start_date: string;
  drug_exposure_start_datetime: string;
  drug_exposure_end_date: string;
  drug_exposure_end_datetime: string;
  verbatim_end_date: string;
  drug_type_concept_id: string;
  stop_reason: string;
  refills: string;
  quantity: string;
  days_supply: string;
  sig: string;
  route_concept_id: string;
  lot_number: string;
  provider_id: string;
  visit_occurrence_id: string;
  visit_detail_id: string;
  drug_source_value: string;
  drug_source_concept_id: string;
  route_source_value: string;
  dose_unit_source_value: string;
}

export async function loader_drug_exposure(param: {
  prismaService: PrismaService;
  logger: Logger;
  loadedDbs: any[];
}) {
  const { prismaService, logger, loadedDbs } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'drug_exposure.csv';

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
            await prismaService.drug_exposure.create({
              data: {
                days_supply: data.days_supply,
                dose_unit_source_value: data.dose_unit_source_value,
                drug_concept_id: data.drug_concept_id,
                drug_exposure_end_date: data.drug_exposure_end_date,
                drug_exposure_end_datetime: data.drug_exposure_end_datetime,
                drug_exposure_id: data.drug_exposure_id,
                drug_exposure_start_date: data.drug_exposure_start_date,
                drug_exposure_start_datetime: data.drug_exposure_start_datetime,
                drug_source_concept_id: data.drug_source_concept_id,
                drug_source_value: data.drug_source_value,
                drug_type_concept_id: data.drug_type_concept_id,
                lot_number: data.lot_number,
                person_id: data.person_id,
                provider_id: data.provider_id,
                quantity: data.quantity,
                refills: data.refills,
                route_concept_id: data.route_concept_id,
                route_source_value: data.route_source_value,
                sig: data.sig,
                stop_reason: data.stop_reason,
                verbatim_end_date: data.verbatim_end_date,
                visit_detail_id: data.visit_detail_id,
                visit_occurrence_id: data.visit_detail_id,
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

  return true;
}
