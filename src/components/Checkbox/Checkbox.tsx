import { memo, useId } from "react";
import type { CheckboxProps } from "./types";
import Text from "@/components/Text";

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  label,
  metadata,
  onChange,
}) => {
  const id = useId();

  return (
    <label
      className="flex items-center py-1 px-2 hover:rounded-sm hover:bg-slate-300"
      htmlFor={id}
    >
      <input
        className="h-4 w-4"
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-4 inline-flex h-full grow items-center justify-between">
        <Text tag="span" view="xs">
          {label}
        </Text>
        {metadata ? (
          <span>
            <Text
              className="inline-flex h-[18px] items-center justify-center rounded-sm bg-blue-500 p-1"
              tag="span"
              view="xs"
              color="white"
            >
              {metadata}
            </Text>
          </span>
        ) : null}
      </span>
    </label>
  );
};

export default memo(Checkbox);
