import type { TextColor, TextView } from "./types";
import { TEXT_COLOR, TEXT_VIEW } from "./constants";

export const isColorFromProps = (
  color: TextColor | string
): color is TextColor => {
  return Object.values(TEXT_COLOR).includes(color as TextColor);
};

export const isViewFromProps = (view: TextView | string): view is TextView => {
  return Object.values(TEXT_VIEW).includes(view as TextView);
};
