import { memo, useMemo } from "react";
import clsx from "clsx";
import type { TextProps } from "./types";
import { isColorFromProps, isViewFromProps } from "./utils";

const Text: React.FC<TextProps> = ({
  className,
  tag = "p",
  view = "xs",
  color = "slate-700",
  children,
}) => {
  const Tag = useMemo(() => {
    return tag;
  }, [tag]);

  return (
    <Tag
      className={clsx(
        `text-${isViewFromProps(view) ? view : `[${view}]`} text-${
          isColorFromProps(color) ? color : `[${color}]`
        } `,
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default memo(Text);
