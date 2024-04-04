export function handleGender(patientGender: string) {
  switch (patientGender) {
    case 'M':
      return 'masculine';
    case 'F':
      return 'feminine';
    default:
      return 'undefined';
  }
}
