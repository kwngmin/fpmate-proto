/**
 * rem 값을 px로 변환
 * @param rem - rem 단위 문자열 (예: "1rem", ".9375rem")
 * @param baseFontSize - 기본 폰트 크기 (기본값: 16px)
 * @returns px 값
 */
export function remToPx(rem: string, baseFontSize: number = 16): number {
  const remValue = parseFloat(rem.replace("rem", ""));
  return Math.round(remValue * baseFontSize * 100) / 100;
}

/**
 * px 값을 rem으로 변환
 * @param px - px 단위 숫자 또는 문자열
 * @param baseFontSize - 기본 폰트 크기 (기본값: 16px)
 * @returns rem 단위 문자열
 */
export function pxToRem(
  px: number | string,
  baseFontSize: number = 16
): string {
  const pxValue =
    typeof px === "string" ? parseFloat(px.replace("px", "")) : px;
  return `${Math.round((pxValue / baseFontSize) * 10000) / 10000}rem`;
}
