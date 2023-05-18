import { memo, useCallback } from "react";
import type { InputChangeHandler } from "@/utils/types";
import type { CheckboxData } from "@/components/Checkbox";
import type { CheckboxesProps } from "./types";
import Checkbox from "@/components/Checkbox";
import Text from "@/components/Text";

const Checkboxes: React.FC<CheckboxesProps> = ({
  label,
  options,
  selected,
  onCheckboxChange,
}) => {
  const onCheckboxToggle = useCallback(
    (option: CheckboxData) => {
      const eventHandler: InputChangeHandler = (event) => {
        onCheckboxChange(option, event.target.checked);
      };

      return eventHandler;
    },
    [onCheckboxChange]
  );

  return (
    <div className="flex flex-col">
      <Text view="xs">{label}</Text>

      <div className="mt-2 max-h-64 overflow-y-auto">
        {options.map((option) => {
          const isChecked = selected.includes(option.value);

          return (
            <Checkbox
              key={option.value}
              checked={isChecked}
              onChange={onCheckboxToggle(option)}
              {...option}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Checkboxes);
