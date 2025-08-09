import { academic } from "../apis/academic";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useStudent } from "./useStudent";

export function useAcademic() {
  const { student } = useStudent();
  const { user } = useAuth();
  const {
    data: academicData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["academicRecord", student?.student_id],
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
