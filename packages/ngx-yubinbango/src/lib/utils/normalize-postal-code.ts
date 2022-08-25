/**
 * 郵便番号をノーマライズします。
 *
 * 全角→半角、ハイフン除去、全角（マイナス、長音）除去
 * @param postalCode 郵便番号
 * @returns
 */
export function normalizePostalCode(postalCode: string): string {
  // 全角→半角、ハイフン除去、全角（マイナス、長音）除去
  return postalCode
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))
    .replace(/[-ー－]/g, '');
}
