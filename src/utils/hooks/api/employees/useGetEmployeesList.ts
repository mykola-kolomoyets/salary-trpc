import type { EmployeeListRequestDTO } from "@/server/api/dto/employees";
import { api } from "@/utils/api";

const useGetEmployeesList = (dto: EmployeeListRequestDTO) => {
  return api.employees.getList.useQuery(dto, {
    enabled: dto?.department != null && dto?.occupation != null,
  });
};

export default useGetEmployeesList;
