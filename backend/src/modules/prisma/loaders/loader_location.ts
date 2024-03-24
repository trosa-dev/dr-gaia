import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  location_id: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  location_source_value: string;
}

export async function loader_location(param: { prismaService: PrismaService }) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'location.csv';

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
            await prismaService.location.create({
              data: {
                address_1: data.address_1,
                address_2: data.address_2,
                city: data.city,
                county: data.county,
                location_id: data.location_id,
                location_source_value: data.location_source_value,
                state: data.state,
                zip: data.zip,
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
