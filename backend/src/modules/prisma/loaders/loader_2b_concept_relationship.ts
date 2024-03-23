import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  concept_id_1: string;
  concept_id_2: string;
  relationship_id: string;
  valid_start_DATE: string;
  valid_end_DATE: string;
  invalid_reason: string;
}

export async function loader_2b_concept_relationship(param: {
  prismaService: PrismaService;
}) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = '2b_concept_relationship.csv';

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
            await prismaService.concept_relationship_2b.create({
              data: {
                concept_id_1: data.concept_id_1,
                concept_id_2: data.concept_id_2,
                invalid_reason: data.invalid_reason,
                relationship_id: data.relationship_id,
                valid_end_date: data.valid_end_DATE,
                valid_start_date: data.valid_start_DATE,
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
