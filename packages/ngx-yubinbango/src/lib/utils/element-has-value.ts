export function elementHasValue<T extends HTMLElement & { value?: unknown }>(
  element: T
): element is T & { value: string | null } {
  return 'value' in element;
}
