import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  condition_era_id: string;
  person_id: string;
  condition_concept_id: string;
  condition_era_start_date: string;
  condition_era_end_date: string;
  condition_occurrence_count: string;
}

export async function loader_condition_era(param: {
  prismaService: PrismaService;
}) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'condition_era.csv';

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
            await prismaService.condition_era.create({
              data: {
                condition_concept_id: data.condition_concept_id,
                condition_era_end_date: data.condition_era_end_date,
                condition_era_id: data.condition_era_id,
                condition_era_start_date: data.condition_era_start_date,
                condition_occurrence_count: data.condition_occurrence_count,
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