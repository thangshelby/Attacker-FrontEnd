import { useMutation, useQuery } from "@tanstack/react-query";
import { student } from "@/apis/student";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";

export function useStudent(citizen_id) {
  const { setToast } = useAppStore();
  const { setStudent, user } = useAuthStore();

  const { data: studentData } = useQuery({
    queryKey: ["student", citizen_id],
    queryFn: async () => {
      const { data } = await student.getStudent(citizen_id);
      setStudent(data.data.student);
      return data.data.student;
    },
    // retry: true,
    enabled: !!citizen_id,
    onError: (error) => {
      console.error("Error fetching student:", error);
    },
  });

  const updateStudent = useMutation({
    mutationFn: (data) =>
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

  const updateStudentDIDById = useMutation({
    mutationFn: (id, data) => student.updateStudentById(id, data),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error updating student DID:", error);
    },
  });

  return {
    student: studentData,
    updateStudent,
    updateStudentDIDById,
  };
}

// export function updateStudentDID(citizen_id, data) {

// }`
