import { colors } from "~/colors";
import type { ColorVariant } from "~/colors";

type HexCode = `#${string}`;

export const AcceptableContrastRatios = {
  LARGE_TEXT: 3,
  TEXT: 4.5,
  IMAGE: 3,
} as const;

export type ContrastRatios =
  (typeof AcceptableContrastRatios)[keyof typeof AcceptableContrastRatios];

type RgbObject = {
  red: number;
  green: number;
  blue: number;
};

export const convertHexToRgb = (hex: HexCode): RgbObject => {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(
      `Invalid hex code. Hex code must begin with a "#" and only contain numeric or a-f characters. Received ${hex}`
    );
  }

  const redHex = hex.slice(1, 3);
  const greenHex = hex.slice(3, 5);
  const blueHex = hex.slice(5);

  return {
    red: parseInt(redHex, 16),
    green: parseInt(greenHex, 16),
    blue: parseInt(blueHex, 16),
  };
};

export const getColorChannelChroma = (value: number): number => {
  if (value < 0 || value > 255) {
    throw new Error(
      `Invalid color channel value. Value must be between 0 and 255, inclusive. Received ${value}`
    );
  }

  const asDecimal = value / 255;

  if (asDecimal <= 0.03928) {
    return asDecimal / 12.92;
  }

  return Math.pow((asDecimal + 0.055) / 1.055, 2.4);
};

export const getLuminance = (hex: HexCode): number => {
  const { red, green, blue } = convertHexToRgb(hex);

  const rChroma = getColorChannelChroma(red);
  const gChroma = getColorChannelChroma(green);
  const bChroma = getColorChannelChroma(blue);

  return 0.2126 * rChroma + 0.7152 * gChroma + 0.0722 * bChroma;
};

export const getContrastRatio = (hexOne: HexCode, hexTwo: HexCode): number => {
  const lumOne = getLuminance(hexOne);
  const lumTwo = getLuminance(hexTwo);

  if (lumOne > lumTwo) {
    return (lumOne + 0.05) / (lumTwo + 0.05);
  }

  return (lumTwo + 0.05) / (lumOne + 0.05);
};

export const isContrastRatioHighEnough = (
  colorOne: HexCode,
  colorTwo: HexCode,
  minimumContrastRatio: ContrastRatios
): boolean => {
  const ratio = getContrastRatio(colorOne, colorTwo);

  return ratio >= minimumContrastRatio;
};

export const getHex = (colorName: ColorVariant): HexCode => {
  return colors[colorName];
};

const defaultForegroundColors: ColorVariant[] = ["gray-800", "black", "white"];

export const getContrastColor = (
  backgroundColor: ColorVariant,
  desiredForegroundColor: ColorVariant | ColorVariant[],
  minimumContrastRatio: ContrastRatios
): ColorVariant => {
  const bgHex = getHex(backgroundColor);

  const colorsToCheck: ColorVariant[] = Array.isArray(desiredForegroundColor)
    ? [...desiredForegroundColor, ...defaultForegroundColors]
    : [desiredForegroundColor, ...defaultForegroundColors];

  for (let i = 0; i < colorsToCheck.length; i++) {
    const color = colorsToCheck[i];
    const fgHex = getHex(color);
    if (isContrastRatioHighEnough(bgHex, fgHex, minimumContrastRatio)) {
      return color;
    }
  }

  return "black";
};
