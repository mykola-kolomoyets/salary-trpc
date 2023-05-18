import { api } from "@/utils/api";

const useGetAllDepartments = () => {
  return api.departments.getAll.useQuery();
};

export default useGetAllDepartments;
