export function isAlphaNumericAndLowercase(input: string): boolean {
  return /^[a-z0-9]+$/.test(input);
}

export function getAPIBaseUrl(): string {
  return process.env.VUE_APP_BEEBETTER_APP_BASE;
}
