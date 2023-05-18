import { useCallback, useRef } from "react";

const usePagination = (limit = 15) => {
  const pageRef = useRef<number>(1);

  const nextPage = useCallback(() => {
    pageRef.current = pageRef.current + 1;
  }, []);

  const prevPage = useCallback(() => {
    if (pageRef.current === 1) return;

    pageRef.current = pageRef.current - 1;
  }, []);

  return [pageRef.current, limit, nextPage, prevPage] as const;
};

export default usePagination;
