import { useEffect } from "react";
import useGetTimelinesByMonth from "@/utils/hooks/api/timelines/useGetTimelinesByMonth";
import useSelect from "@/utils/hooks/useSelect";
import { months } from "@/utils/constants";

const usePrintFilter = () => {
  /**
   * SELECTS
   */
  const [month, monthsOptions, onMonthChange, updateMonthsOptions] =
    useSelect();

  /**
   * API
   */
  const timelineApi = useGetTimelinesByMonth(month?.value);

  /**
   * EFFECTS
   */
  useEffect(() => {
    updateMonthsOptions(
      months.map((month, index) => {
        return {
          label: month,
          value: index + 1,
        };
      })
    );
  }, [updateMonthsOptions]);

  /**
   * RESULT
   */
  return {
    api: {
      timeline: timelineApi,
    },
    monthSelect: {
      selected: month,
      options: monthsOptions,
      onChange: onMonthChange,
    },
  };
};

export default usePrintFilter;
