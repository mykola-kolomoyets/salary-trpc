import { api } from "@/utils/api";

const useGetTimelinesByMonth = (month?: number) => {
  return api.timelines.getByMonth.useQuery(
    { month: month || 1 },
    {
      enabled: !!month,
    }
  );
};

export default useGetTimelinesByMonth;
