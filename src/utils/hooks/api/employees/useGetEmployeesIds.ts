import { api } from "@/utils/api";

const useGetEmployeesIds = () => {
  return api.employees.getIds.useQuery();
};

export default useGetEmployeesIds;
