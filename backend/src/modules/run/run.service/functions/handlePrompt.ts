export function handlePrompt(params: {
  diagnosis: string;
  icd9_classification: string[];
}) {
  const { diagnosis, icd9_classification } = params;

  return [
    `As a physician, you've been tasked with reviewing a patient's medical records`,
    `and confirming the final diagnosis based on the assigned ICD-9 codes. The patient's`,
    `records include a list of ICD-9 classification along with a final diagnosis.`,
    `Your objective is to assess whether the provided final diagnosis aligns with the assigned ICD-9 classification.`,

    `Patient's ICD-9 classification:`,
    `${icd9_classification}`,
    `Final diagnosis provided:`,
    `${diagnosis}`,

    `Your task is to utilize your medical expertise and understanding of ICD-9`,
    `to evaluate whether the provided final diagnosis is consistent with the assigned ICD-9 classification for the patient.`,
    `Provide your assessment only within the model:`,

    `{`,
    `"diagnostic_validation": boolean,
     "likert" : number (For likert scale, use: 1 Strongly Disagree; 2 Disagree; 3 Neutral; 4 Agree; 5 Strongly Agree),
     "disagreement": [only an array of Patient's ICD-9 classification that you do not agree with]`,
    `}`,
  ].join(' ');
}
