import { useCallback, useState } from "react";
import type { InputChangeHandler } from "@/utils/types";
import useDebounce from "@/utils/hooks/useDebounce";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery);

  const onChange = useCallback<InputChangeHandler>((event) => {
    setSearchQuery(event.target.value?.trim());
  }, []);

  return [searchQuery, debouncedSearchQuery, onChange] as const;
};

export default useSearch;
