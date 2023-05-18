import { api } from "@/utils/api";

const useGetLevels = () => {
  return api.employees.getLevels.useQuery();
};

export default useGetLevels;
