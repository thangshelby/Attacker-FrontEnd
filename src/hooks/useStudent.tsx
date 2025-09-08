import { useMutation, useQuery } from "@tanstack/react-query";
import { student } from "@/apis/student";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { Student } from "@/types";

export function useStudent(citizen_id: string) {
  const { setToast } = useAppStore();
  const { setStudent, user } = useAuthStore();

  const {
    data: studentData,
    isLoading: studentLoading,
  }: {
    data: Student | undefined;
    isLoading: boolean;
  } = useQuery({
    queryKey: ["student", citizen_id],
    queryFn: async () => {
      const { data } = await student.getStudent(citizen_id);
      setStudent(data.data.student);
      return data.data.student;
    },
    // retry: true,
    enabled: !!citizen_id,
  });

  const updateStudent = useMutation({
    mutationFn: (data: Partial<Student>) =>{
      console.log('🔥 useStudent - updateStudent called with data:', data);
      console.log('👤 Using citizen_id from user:', user?.citizen_id);
      
      const payload = {
        citizen_id: user?.citizen_id,
        ...data,
      };
      console.log('📦 Final payload to API:', payload);
      
      return student.updateStudent(payload);
    },
    onSuccess: (data) => {
      console.log('✅ useStudent - Update success:', data);
      setToast({
        type: "success",
        message: "Student updated successfully",
      });

      setStudent(data.data.student);
    },
    onError: (error) => {
      console.error("❌ useStudent - Error updating student:", error);
    },
  });

  return {
    student: studentData,
    isLoading: studentLoading,
    updateStudent,
  };
}
