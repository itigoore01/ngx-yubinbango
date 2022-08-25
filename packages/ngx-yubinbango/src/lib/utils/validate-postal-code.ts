export function validatePostalCode(postalCode: string): boolean {
  return /^\d{7}$/.test(postalCode);
}
