import type { CheckboxData } from "@/components/Checkbox/types";

export type CheckboxesProps = {
  label: string;
  options: CheckboxData[];
  selected: string[];
  onCheckboxChange: (option: CheckboxData, checked: boolean) => void;
};
