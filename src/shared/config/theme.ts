/**
 * 테마 설정
 * Linear.app + Minimals.cc 하이브리드 테마
 */

export const theme = {
  meta: {
    source: "Linear.app (typography & layout) + Minimals.cc (colors)",
    extractedAt: "2024-11-24",
    description:
      "Linear의 디자인 시스템에 Minimals의 라이트 모드 색상을 적용한 하이브리드 테마",
  },
  colors: {
    brand: {
      primary: "#00AB55",
      text: "#FFFFFF",
      bg: "#00AB55",
      tint: "#C8FAD6",
      hover: "#5BE49B",
    },
    accent: {
      primary: "#007B3D",
      tint: "#B8E6D0",
      hover: "#00995A",
    },
    semantic: {
      red: "#FF5630",
      orange: "#FFAB00",
      yellow: "#FFD666",
      green: "#22C55E",
      blue: "#00B8D9",
      indigo: "#8E33FF",
      success: "#22C55E",
      warning: "#FFAB00",
      error: "#FF5630",
      info: "#00B8D9",
    },
    background: {
      primary: "#FFFFFF",
      secondary: "#F9FAFB",
      tertiary: "#F4F6F8",
      quaternary: "#DFE3E8",
      quinary: "#C4CDD5",
      paper: "#FFFFFF",
      neutral: "#F4F6F8",
      default: "#FFFFFF",
    },
    foreground: {
      primary: "#1C252E",
      secondary: "#637381",
      tertiary: "#919EAB",
      quaternary: "#C4CDD5",
    },
    text: {
      primary: "#1C252E",
      secondary: "#637381",
      tertiary: "#919EAB",
      quaternary: "#C4CDD5",
      disabled: "#919EAB",
    },
    border: {
      primary: "#DFE3E8",
      secondary: "#C4CDD5",
      tertiary: "#919EAB",
      divider: "rgba(145, 158, 171, 0.2)",
    },
    grey: {
      50: "#FCFDFD",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#1C252E",
      900: "#141A21",
    },
  },
  typography: {
    fontFamily: {
      regular:
        '"Noto Sans KR","Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif',
      monospace: '"Berkeley Mono",ui-monospace,"SF Mono","Menlo",monospace',
      serifDisplay:
        '"Tiempos Headline",ui-serif,Georgia,Cambria,"Times New Roman",Times,serif',
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "680",
    },
    fontSize: {
      micro: ".6875rem", // 11px
      mini: ".75rem", // 12px
      small: ".8125rem", // 13px
      regular: ".9375rem", // 15px
      large: "1.125rem", // 18px
      title1: "1.0625rem", // 17px
      title2: "1.3125rem", // 21px
      title3: "1.5rem", // 24px
      title4: "2rem", // 32px
      title5: "2.5rem", // 40px
      title6: "3rem", // 48px
      title7: "3.5rem", // 56px
      title8: "4rem", // 64px
      title9: "4.5rem", // 72px
    },
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    "3xl": "32px",
    full: "9999px",
  },
  shadows: {
    none: "none",
    tiny: "0 1px 2px 0 rgba(145, 158, 171, 0.16)",
    low: "0px 2px 4px rgba(145, 158, 171, 0.2)",
    medium: "0px 4px 24px rgba(145, 158, 171, 0.2)",
    high: "0px 7px 32px rgba(145, 158, 171, 0.35)",
    card: "0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)",
    dropdown:
      "0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
    dialog: "-40px 40px 80px -8px rgba(0, 0, 0, 0.24)",
  },
} as const;

export type Theme = typeof theme;
