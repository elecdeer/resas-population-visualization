import { useMemo } from "react";

export const useRandomColors = (length: number): string[] => {
  return useMemo(() => {
    return [...Array(length)].map(() => getRandomColor());
  }, [length]);
};

const getRandomColor = (): string => {
  const r = Math.ceil(Math.random() * 256);
  const g = Math.ceil(Math.random() * 256);
  const b = Math.ceil(Math.random() * 256);
  //0x33 * 3, 0xCC * 3
  //暗すぎる or 明るすぎるならもう一回
  if (r + g + b < 153 || 612 < r + g + b) {
    return getRandomColor();
  }
  return rgbNumToHexStr(r, g, b);
};

const rgbNumToHexStr = (r: number, g: number, b: number) => {
  const rStr = r.toString(16).padStart(2, "0");
  const gStr = g.toString(16).padStart(2, "0");
  const bStr = b.toString(16).padStart(2, "0");
  return `#${rStr}${gStr}${bStr}`;
};
