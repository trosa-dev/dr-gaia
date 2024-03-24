import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  specimen_id: string;
  person_id: string;
  specimen_concept_id: string;
  specimen_type_concept_id: string;
  specimen_date: string;
  specimen_datetime: string;
  quantity: string;
  unit_concept_id: string;
  anatomic_site_concept_id: string;
  disease_status_concept_id: string;
  specimen_source_id: string;
  specimen_source_value: string;
  unit_source_value: string;
  anatomic_site_source_value: string;
  disease_status_source_value: string;
}

export async function loader_specimen(param: { prismaService: PrismaService }) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'specimen.csv';

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
            await prismaService.specimen.create({
              data: {
                anatomic_site_concept_id: data.anatomic_site_concept_id,
                anatomic_site_source_value: data.anatomic_site_source_value,
                disease_status_concept_id: data.disease_status_concept_id,
                disease_status_source_value: data.disease_status_source_value,
                person_id: data.person_id,
                quantity: data.quantity,
                specimen_concept_id: data.specimen_concept_id,
                specimen_date: data.specimen_date,
                specimen_datetime: data.specimen_datetime,
                specimen_id: data.specimen_id,
                specimen_source_id: data.specimen_source_id,
                specimen_source_value: data.specimen_source_value,
                specimen_type_concept_id: data.specimen_type_concept_id,
                unit_concept_id: data.unit_concept_id,
                unit_source_value: data.unit_source_value,
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
