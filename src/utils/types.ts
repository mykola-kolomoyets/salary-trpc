import type { ActionMeta, SingleValue } from "react-select";
import type { CheckboxData } from "@/components/Checkbox/types";

export type SelectOption = {
  label: string;
  value: number;
};

export type SelectChangeHandler<T = SelectOption> = (
  newValue: SingleValue<T>,
  actionMeta?: ActionMeta<T>
) => void;

export type InputChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type CheckboxChangeHandler = (
  option: CheckboxData,
  checked: boolean
) => void;

export type ObjValues<T> = T[keyof T];

export type WithClassName<T> = T & {
  className?: string;
};
