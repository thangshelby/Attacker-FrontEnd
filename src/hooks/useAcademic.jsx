import { academic } from "../apis/academic";
import { useQuery } from "@tanstack/react-query";
import { useStudent } from "./useStudent";

export function useAcademic() {
  const { student } = useStudent();
    const {
    data: academicData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["academicRecord"],
    queryFn: async () => {
      const { data } = await academic.getAcademicRecord(student.student_id);
      return data.data.academic;
    },
    retry: false,
    enabled: !!student?.student_id, // Only run if student ID is available
  });

  return {
    academicData,
    isLoading,
    error,
  };
}
