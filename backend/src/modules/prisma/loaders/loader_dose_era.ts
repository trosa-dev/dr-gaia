import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  dose_era_id: string;
  person_id: string;
  drug_concept_id: string;
  unit_concept_id: string;
  dose_value: string;
  dose_era_start_date: string;
  dose_era_end_date: string;
}

export async function loader_dose_era(param: { prismaService: PrismaService }) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'dose_era.csv';

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
            await prismaService.dose_era.create({
              data: {
                dose_era_end_date: data.dose_era_end_date,
                dose_era_id: data.dose_era_id,
                dose_era_start_date: data.dose_era_start_date,
                dose_value: data.dose_value,
                drug_concept_id: data.drug_concept_id,
                person_id: data.person_id,
                unit_concept_id: data.unit_concept_id,
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
