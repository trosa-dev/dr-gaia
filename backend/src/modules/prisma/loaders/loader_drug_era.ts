import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  drug_era_id: string;
  person_id: string;
  drug_concept_id: string;
  drug_era_start_date: string;
  drug_era_end_date: string;
  drug_exposure_count: string;
  gap_days: string;
}

export async function loader_drug_era(param: { prismaService: PrismaService }) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'drug_era.csv';

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
            await prismaService.drug_era.create({
              data: {
                drug_concept_id: data.drug_concept_id,
                drug_era_end_date: data.drug_era_end_date,
                drug_era_id: data.drug_era_id,
                drug_era_start_date: data.drug_era_start_date,
                drug_exposure_count: data.drug_exposure_count,
                gap_days: data.gap_days,
                person_id: data.person_id,
              },
            });
          } catch (error) {
            console.log(error);
          }
        })
        .on('end', async () => {
          try {
            await prismaService.loader.create({ data: { id: csvId } });
            console.log(`Done loading: ${csvId}`);
          } catch (error) {
            console.log(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  return true;
}
