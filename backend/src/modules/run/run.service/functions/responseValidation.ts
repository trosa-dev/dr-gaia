export function responseValidation(response: any) {
  if ('message' in response === false) return false;
}
