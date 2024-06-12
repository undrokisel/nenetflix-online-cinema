export enum Space {
  SMALLEST = "8px",
  XXS = "16px",
  XS = "20px",
  S = "24px",
  M = "32px",
  L = "40px",
  XL = "48px",
  XXL = "56px",
  LARGEST = "64px",
}

export enum FontSize {
  XS = "16px",
  S = "18px",
  M = "20px",
  L = "24px",
  XL = "28px",
  XXL = "32px",
  XXXL = "40px",
}

export enum Breakpoint {
  XS = "320px",
  S = "768px",
  M = "1024px",
  L = "1280px",
  XL = "1440px",
  XXL = "1920px",
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  breakpoints: Breakpoint,
  spaces: Space,
  fontSizes: FontSize,
};
