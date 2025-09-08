import { academic } from "../apis/academic";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Academic } from "@/types";

export function useAcademic(student_id: string) {
  const queryClient = useQueryClient();
  
  const {
    data: academicData,
    isLoading,
    error,
    refetch,
  }: {
    data: Academic | undefined;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
  } = useQuery({
    queryKey: ["academicRecord", student_id],
    queryFn: async () => {
      console.log('🚀 === useAcademic queryFn CALLED ===');
      console.log('📞 Fetching academic data for student_id:', student_id);
      try {
        const { data } = await academic.getAcademicRecord(student_id);
        console.log('✅ === Academic API SUCCESS ===');
        console.log('📦 API Response:', data);
        console.log('🎯 Academic data:', data.data.academic);
        return data.data.academic;
      } catch (error: any) {
        console.log('❌ === Academic API ERROR ===');
        console.log('🚨 Error:', error);
        // Nếu là 404 (record chưa tồn tại), trả về null thay vì throw error
        if (error.response?.status === 404) {
          console.log('📭 Academic record not found (404), returning null');
          return null;
        }
        // Các lỗi khác thì vẫn throw
        console.log('🚨 Throwing error for status:', error.response?.status);
        throw error;
      }
    },
    retry: false, // Không retry cho 404
    refetchOnWindowFocus: false, // Tắt auto-refetch để tránh loop vô hạn
    refetchOnReconnect: false,
    enabled: !!student_id, // Only run if student ID is available
    staleTime: 5 * 60 * 1000, // Cache 5 phút thay vì 0
    gcTime: 10 * 60 * 1000, // Cache 10 phút thay vì 0
  });

  // Function để manually invalidate cache
  const invalidateAcademicData = () => {
    queryClient.invalidateQueries({
      queryKey: ["academicRecord", student_id]
    });
  };

  return {
    academicData,
    isLoading,
    error,
    refetch,
    invalidateAcademicData,
  };
}