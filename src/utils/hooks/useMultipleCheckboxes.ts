import { useCallback, useRef, useState } from "react";
import type { CheckboxChangeHandler } from "@/utils/types";
import type { CheckboxData } from "@/components/Checkbox/types";
import useDebounce from "@/utils/hooks/useDebounce";

type MultipleCheckboxes = CheckboxData[];

const useMultipleCheckboxes = (values?: MultipleCheckboxes) => {
  const valuesRef = useRef<MultipleCheckboxes>(values || []);

  const [selected, setSelected] = useState<string[]>([]);

  const debouncedSelected = useDebounce(selected, 450);

  const onChange = useCallback<CheckboxChangeHandler>((option, checked) => {
    if (checked) {
      setSelected((prev) => {
        return prev.concat([option.value]);
      });

      return;
    }

    setSelected((prev) => {
      return prev.filter((prevOption) => {
        return prevOption !== option.value;
      });
    });
  }, []);

  const updateValues = useCallback((newValues: MultipleCheckboxes) => {
    valuesRef.current = newValues;
  }, []);

  return [
    selected,
    debouncedSelected,
    valuesRef.current,
    onChange,
    updateValues,
  ] as const;
};

export default useMultipleCheckboxes;
