export function getParamAsNumber(value: unknown, name: string): number {
  if (typeof value !== "string") {
    throw new Error(`${name} must be a string`);
  }

  const num = Number(value);

  if (Number.isNaN(num)) {
    throw new Error(`${name} must be a valid number`);
  }

  return num;
}