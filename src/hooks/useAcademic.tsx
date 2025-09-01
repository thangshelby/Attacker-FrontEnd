import { academic } from "../apis/academic";
import { useQuery } from "@tanstack/react-query";
import { Academic } from "@/types";

export function useAcademic(student_id: string) {
  const {
    data: academicData,
    isLoading,
    error,
  }: {
    data: Academic | undefined;
    isLoading: boolean;
    error: Error | null;
  } = useQuery({
    queryKey: ["academicRecord", student_id],
    queryFn: async () => {
      try {
        const { data } = await academic.getAcademicRecord(student_id);
        return data.data.academic;
      } catch (error) {
        // Nếu là 404 (record chưa tồn tại), trả về null thay vì throw error
        if (error.response?.status === 404) {
          console.log('Academic record not found, returning null');
          return null;
        }
        // Các lỗi khác thì vẫn throw
        throw error;
      }
    },
    retry: false, // Không retry cho 404
    refetchOnWindowFocus: false, // Tắt auto-refetch
    refetchOnReconnect: false,
    enabled: !!student_id, // Only run if student ID is available
  });

  return {
    academicData,
    isLoading,
    error,
  };
}
