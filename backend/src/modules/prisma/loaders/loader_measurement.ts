import * as csv from 'csv-parser';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PrismaService } from '../prisma.service';

interface CsvData {
  measurement_id: string;
  person_id: string;
  measurement_concept_id: string;
  measurement_date: string;
  measurement_datetime: string;
  measurement_time: string;
  measurement_type_concept_id: string;
  operator_concept_id: string;
  value_as_number: string;
  value_as_concept_id: string;
  unit_concept_id: string;
  range_low: string;
  range_high: string;
  provider_id: string;
  visit_occurrence_id: string;
  visit_detail_id: string;
  measurement_source_value: string;
  measurement_source_concept_id: string;
  unit_source_value: string;
  value_source_value: string;
}

export async function loader_measurement(param: {
  prismaService: PrismaService;
}) {
  const { prismaService } = param;

  let csvIsLoaded: null | { id: string } = null;
  const csvId = 'measurement.csv';

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
            await prismaService.measurement.create({
              data: {
                measurement_concept_id: data.measurement_concept_id,
                measurement_date: data.measurement_date,
                measurement_datetime: data.measurement_datetime,
                measurement_id: data.measurement_id,
                person_id: data.person_id,
                measurement_source_concept_id:
                  data.measurement_source_concept_id,
                measurement_source_value: data.measurement_source_value,
                measurement_time: data.measurement_time,
                measurement_type_concept_id: data.measurement_type_concept_id,
                operator_concept_id: data.operator_concept_id,
                provider_id: data.provider_id,
                range_high: data.range_high,
                range_low: data.range_low,
                unit_concept_id: data.unit_concept_id,
                unit_source_value: data.unit_source_value,
                value_as_concept_id: data.value_as_concept_id,
                value_as_number: data.value_as_number,
                value_source_value: data.value_source_value,
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
