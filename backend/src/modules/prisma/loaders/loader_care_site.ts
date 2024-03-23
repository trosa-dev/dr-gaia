import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  care_site_id: string;
  care_site_name: string;
  place_of_service_concept_id: string;
  location_id: string;
  care_site_source_value: string;
  place_of_service_source_value: string;
}

export async function loader_care_site(param: {
  prismaService: PrismaService;
}) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'care_site.csv';

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
            await prismaService.care_site.create({
              data: {
                care_site_id: data.care_site_id,
                care_site_name: data.care_site_name,
                care_site_source_value: data.care_site_source_value,
                location_id: data.location_id,
                place_of_service_concept_id: data.place_of_service_concept_id,
                place_of_service_source_value:
                  data.place_of_service_source_value,
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
