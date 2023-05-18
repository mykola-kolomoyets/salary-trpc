import type { SingleValue } from "react-select";
import type { SelectChangeHandler, SelectOption } from "@/utils/types";

export type SelectProps = {
  label: string;
  options: SelectOption[];
  value?: SingleValue<SelectOption>;
  isSearchable?: boolean;
  onChange: SelectChangeHandler;
};
