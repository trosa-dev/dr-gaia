import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  relationship_concept_id: string;
  fact_id_1: string;
  fact_id_2: string;
  domain_concept_id_1: string;
  domain_concept_id_2: string;
}

export async function loader_fact_relationship(param: {
  prismaService: PrismaService;
}) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'fact_relationship.csv';

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
            await prismaService.fact_relationship.create({
              data: {
                domain_concept_id_1: data.domain_concept_id_1,
                domain_concept_id_2: data.domain_concept_id_2,
                fact_id_1: data.fact_id_1,
                fact_id_2: data.fact_id_2,
                relationship_concept_id: data.relationship_concept_id,
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
