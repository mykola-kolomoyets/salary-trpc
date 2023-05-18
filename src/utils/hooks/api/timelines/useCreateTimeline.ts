import { api } from "@/utils/api";

const useCreateTImeline = () => {
  return api.timelines.create.useMutation();
};

export default useCreateTImeline;
