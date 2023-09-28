import { type Sharp } from "sharp";

import { rgbToHex } from "./rgb-to-hex";

export async function getDominantColor(src: Sharp) {
  const { dominant } = await src.stats();

  return rgbToHex(dominant);
}
