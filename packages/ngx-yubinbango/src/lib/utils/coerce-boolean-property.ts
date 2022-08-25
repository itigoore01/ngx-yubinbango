export type BooleanPropertyType = boolean | string | null | undefined;

export function coerceBooleanProperty(value: unknown): boolean {
  return value != null && `${value}` !== 'false';
}
