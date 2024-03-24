import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  person_id: string;
  death_date: string;
  death_datetime: string;
  death_type_concept_id: string;
  cause_concept_id: string;
  cause_source_value: string;
  cause_source_concept_id: string;
}

export async function loader_death(param: { prismaService: PrismaService }) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'death.csv';

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
            await prismaService.death.create({
              data: {
                cause_concept_id: data.cause_concept_id,
                cause_source_concept_id: data.cause_source_concept_id,
                cause_source_value: data.cause_source_value,
                death_date: data.death_date,
                death_datetime: data.death_datetime,
                death_type_concept_id: data.death_type_concept_id,
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
