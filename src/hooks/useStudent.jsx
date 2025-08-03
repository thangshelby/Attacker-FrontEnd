import { useMutation, useQuery } from "@tanstack/react-query";
import { student } from "@/apis/student";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";

export function useStudent() {
  const { setToast } = useAppStore();
  const { setStudent, user } = useAuthStore();

  const { data: studentData } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const { data } = await student.getStudent(user.citizen_id);
      setStudent(data.data.student);
      return data.data.student;
    },
    retry: false,
    enabled: true,
    onError: (error) => {
      console.error("Error fetching student:", error);
    },
  });
  const getStudent = useQuery({
    queryKey: ["student"],
    queryFn: () => student.getStudent(),
  });
  const updateStudent = useMutation({
    mutationFn: (data) => student.updateStudent(data),
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

  const updateStudentDIDById = useMutation({
    mutationFn: (id, data) => student.updateStudentById(id, data),
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error("Error updating student DID:", error);
    },
  });

  return {
    student: studentData,
    getStudent,
    updateStudent,
    updateStudentDIDById,
  };
}
