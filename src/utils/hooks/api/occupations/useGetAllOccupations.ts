import { api } from "@/utils/api";

const useGetAllOccupations = () => {
  return api.occupations.getAll.useQuery();
};

export default useGetAllOccupations;
