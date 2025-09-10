import { useMutation, useQuery } from "@tanstack/react-query";
import { student } from "@/apis/student";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { Student } from "@/types";
import { queryClient } from "@/apis/react-query";

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
      try {
        const { data } = await student.getStudent(citizen_id);
        console.log("📦 Student API response:", data);

        // Handle both response formats
        const studentInfo = data.data?.student || data.student;
        if (studentInfo) {
          setStudent(studentInfo);
          return studentInfo;
        } else {
          console.log("📭 No student data found for citizen_id:", citizen_id);
          return null;
        }
      } catch (error: any) {
        console.log(
          "❌ Student API error:",
          error.response?.status,
          error.response?.data,
        );
        if (error.response?.status === 404) {
          console.log("📭 Student not found, returning null");
          return null;
        }
        throw error;
      }
    },
    retry: false, // Don't retry on 404
    enabled: !!citizen_id,
  });

  const updateStudent = useMutation({
    mutationFn: (data: Partial<Student>) => {
      console.log("🔥 useStudent - updateStudent called with data:", data);
      console.log("👤 Using citizen_id from user:", user?.citizen_id);
      const payload = {
        citizen_id: user?.citizen_id,
        ...data,
      };
      console.log("📦 Final payload to API:", payload);

      queryClient.setQueryData(["student", citizen_id], (oldData: any) => ({
        ...oldData,
        ...data,
      }));
      return student.updateStudent(payload);
    },
    onSuccess: (data) => {
      console.log("✅ useStudent - Update success:", data);
      setToast({
        type: "success",
        message: "Student updated successfully",
      });

      // Handle both response formats
      const studentInfo = data.data?.student || data.student;
      if (studentInfo) {
        setStudent(studentInfo);
      }
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
