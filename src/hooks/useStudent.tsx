import { useMutation, useQuery } from "@tanstack/react-query";
import { student } from "@/apis/student";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";

export function useStudent(citizen_id: string) {
  const { setToast } = useAppStore();
  const { setStudent, user } = useAuthStore();

  const { data: studentData, isLoading: studentLoading } = useQuery({
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
    mutationFn: (data: any) =>
      student.updateStudent({
        citizen_id: user?.citizen_id,
        ...data,
      }),
    onSuccess: (data) => {
      setToast({
        type: "success",
        message: "Student updated successfully",
      });

      setStudent(data.data.student);
    },
    onError: (error) => {
      console.error("Error updating student:", error);
    },
  });

  return {
    student: studentData,
    isLoading: studentLoading,
    updateStudent,
  };
}

