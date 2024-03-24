import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  visit_detail_id: string;
  person_id: string;
  visit_detail_concept_id: string;
  visit_detail_start_date: string;
  visit_detail_start_datetime: string;
  visit_detail_end_date: string;
  visit_detail_end_datetime: string;
  visit_detail_type_concept_id: string;
  provider_id: string;
  care_site_id: string;
  admitting_source_concept_id: string;
  discharge_to_concept_id: string;
  preceding_visit_detail_id: string;
  visit_detail_source_value: string;
  visit_detail_source_concept_id: string;
  admitting_source_value: string;
  discharge_to_source_value: string;
  visit_detail_parent_id: string;
  visit_occurrence_id: string;
}

export async function loader_visit_detail(param: {
  prismaService: PrismaService;
}) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'visit_detail.csv';

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
            await prismaService.visit_detail.create({
              data: {
                admitting_source_concept_id: data.admitting_source_concept_id,
                admitting_source_value: data.admitting_source_value,
                care_site_id: data.care_site_id,
                discharge_to_concept_id: data.discharge_to_concept_id,
                discharge_to_source_value: data.discharge_to_source_value,
                person_id: data.person_id,
                preceding_visit_detail_id: data.preceding_visit_detail_id,
                provider_id: data.provider_id,
                visit_detail_concept_id: data.visit_detail_concept_id,
                visit_detail_end_date: data.visit_detail_end_date,
                visit_detail_end_datetime: data.visit_detail_end_datetime,
                visit_detail_id: data.visit_detail_id,
                visit_detail_parent_id: data.visit_detail_parent_id,
                visit_detail_source_concept_id:
                  data.visit_detail_source_concept_id,
                visit_detail_source_value: data.visit_detail_source_value,
                visit_detail_start_date: data.visit_detail_start_date,
                visit_detail_start_datetime: data.visit_detail_start_datetime,
                visit_detail_type_concept_id: data.visit_detail_type_concept_id,
                visit_occurrence_id: data.visit_occurrence_id,
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
