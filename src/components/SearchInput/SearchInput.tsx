import { memo } from "react";
import type { SearchInputProps } from "./types";
import Text from "@/components/Text";

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <label className="mb-4 block" htmlFor="search">
      <Text view="xs" color="slate-700">
        Enter name of employee
      </Text>
      <input
        className="mt-2 h-9 w-full rounded-[0.25rem] border-x border-y border-solid border-slate-300 bg-transparent bg-white p-2 text-slate-700 outline-none"
        type="text"
        inputMode="search"
        id="search"
        name="search"
        placeholder="Search for employee"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default memo(SearchInput);
