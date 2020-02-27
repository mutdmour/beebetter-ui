export function isAlphaNumericAndLowercase(input: string): boolean {
 return /^[a-z0-9]+$/.test(input)
}
