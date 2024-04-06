import { PatientRepository } from '../../patient.repository';

export async function handleDiagnosis(params: {
  patientRepository: PatientRepository;
  subject_id: string;
}) {
  const { patientRepository, subject_id } = params;

  const diagnosis = await patientRepository.getDiagnosis(subject_id);

  const admissions: Promise<any>[] = [];
  const icd9Codes: Promise<any>[] = [];
  const chartEvents: Promise<any>[] = [];

  diagnosis.map((item) => {
    admissions.push(patientRepository.getHospitalAdmissions(item.hadm_id));
    icd9Codes.push(patientRepository.getDIdc9Code(item.icd9_code));
    chartEvents.push(patientRepository.getChartEvents(item.hadm_id));
  });

  const admissionsQuery = await Promise.all([...admissions]);
  const icd9CodesQuery = await Promise.all([...icd9Codes]);

  return diagnosis.map((_, index) => {
    return {
      ...admissionsQuery[index],
      ...icd9CodesQuery[index],
    };
  });
}
