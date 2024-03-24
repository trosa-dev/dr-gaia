import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  procedure_occurrence_id: string;
  person_id: string;
  procedure_concept_id: string;
  procedure_date: string;
  procedure_datetime: string;
  procedure_type_concept_id: string;
  modifier_concept_id: string;
  quantity: string;
  provider_id: string;
  visit_occurrence_id: string;
  visit_detail_id: string;
  procedure_source_value: string;
  procedure_source_concept_id: string;
  modifier_source_value: string;
}

export async function loader_procedure_occurrence(param: {
  prismaService: PrismaService;
}) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'procedure_occurrence.csv';

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
            await prismaService.procedure_occurrence.create({
              data: {
                modifier_concept_id: data.modifier_concept_id,
                modifier_source_value: data.modifier_source_value,
                person_id: data.person_id,
                procedure_concept_id: data.procedure_concept_id,
                procedure_date: data.procedure_date,
                procedure_datetime: data.procedure_datetime,
                procedure_occurrence_id: data.procedure_occurrence_id,
                procedure_source_concept_id: data.procedure_source_concept_id,
                procedure_source_value: data.procedure_source_value,
                procedure_type_concept_id: data.procedure_type_concept_id,
                provider_id: data.provider_id,
                quantity: data.quantity,
                visit_detail_id: data.visit_detail_id,
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
