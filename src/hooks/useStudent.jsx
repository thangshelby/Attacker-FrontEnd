import { useMutation, useQuery } from "@tanstack/react-query";
import { student } from "@/apis/student";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";

export function useStudent() {
  const { setToast } = useAppStore();
  const { setStudent, user } = useAuthStore();

  const { data: studentData } = useQuery({
    queryKey: ["student", user?.citizen_id],
    queryFn: async () => {
      const { data } = await student.getStudent(user.citizen_id);
      setStudent(data.data.student);
      return data.data.student;
    },
    retry: false,
    enabled: !!user?.citizen_id,
    onError: (error) => {
      console.error("Error fetching student:", error);
    },
  });
  const getStudentByCitizenId = useQuery({
    queryKey: ["studentByCitizenId", user?.citizen_id],
    queryFn: async () => {
      const { data } = await student.getStudentByCitizenId(user.citizen_id);
      return data.data.student;
    },
    enabled: !!user?.citizen_id,
    onError: (error) => {
      console.error("Error fetching student by citizen ID:", error);
      setToast({
        type: "error",
        message: "Không tìm thấy sinh viên với mã số công dân này.",
      });
    },
  });
  const getStudent = useQuery({
    queryKey: ["student"],
    queryFn: () => student.getStudent(),
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
    getStudent,
    getStudentByCitizenId,
    updateStudent,
    updateStudentDIDById,
  };
}
