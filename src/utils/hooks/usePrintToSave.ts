import { useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";

const usePrintToSave = (
  ref: React.RefObject<HTMLDivElement>,
  fileName?: string
) => {
  const reactToPrintContent = useCallback(() => {
    return ref.current;
  }, [ref]);

  const onPrintClick = useReactToPrint({
    content: reactToPrintContent,
    documentTitle:
      fileName || `report-${dayjs(new Date()).format("DD-MM-YYYY")}`,
    removeAfterPrint: true,
  });

  return onPrintClick;
};

export default usePrintToSave;
