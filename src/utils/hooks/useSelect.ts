import { useCallback, useRef, useState } from "react";
import type { SelectChangeHandler, SelectOption } from "@/utils/types";

const useSelect = <T = SelectOption>(values?: T[]) => {
  const valuesRef = useRef<T[]>(values || []);

  const [value, setValue] = useState<T | undefined>(
    values?.length ? values[0] : undefined
  );

  const onChange = useCallback<SelectChangeHandler>((newValue) => {
    setValue(newValue as T);
  }, []);

  const updateValues = useCallback((newValues: T[]) => {
    valuesRef.current = newValues;

    setValue(newValues[0] as T);
  }, []);

  return [value, valuesRef.current, onChange, updateValues] as const;
};

export default useSelect;
