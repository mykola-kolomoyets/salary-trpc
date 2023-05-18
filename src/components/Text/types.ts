import type { ObjValues, WithClassName } from "@/utils/types";
import type { TEXT_COLOR, TEXT_VIEW } from "./constants";

export type TextView = ObjValues<typeof TEXT_VIEW>;
export type TextColor = ObjValues<typeof TEXT_COLOR>;

export type TextProps = WithClassName<{
  tag?: "p" | "span";
  view: TextView | string;
  color?: TextColor | string;
}> &
  React.HTMLAttributes<HTMLParagraphElement>;
