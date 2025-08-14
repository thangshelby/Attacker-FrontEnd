import { academic } from "../apis/academic";
import { useQuery } from "@tanstack/react-query";
export function useAcademic(student_id:string) {
  const {
    data: academicData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["academicRecord", student_id],
    queryFn: async () => {
      const { data } = await academic.getAcademicRecord(student_id);
      return data.data.academic;
    },
    retry: false,
    enabled: !!student_id, // Only run if student ID is available
  });

  return {
    academicData,
    isLoading,
    error,
  };
}
