function colorToHex(color: number) {
  const hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
}

interface IRgbColor {
  r: number;
  g: number;
  b: number;
}

export function rgbToHex(rgb: IRgbColor) {
  const { r, g, b } = rgb;

  return `#${colorToHex(r)}${colorToHex(g)}${colorToHex(b)}`;
}
