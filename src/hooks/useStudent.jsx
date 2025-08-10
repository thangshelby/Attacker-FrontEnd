import { useMutation, useQuery } from "@tanstack/react-query";
import { student } from "@/apis/student";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";

export function useStudent() {
  const { setToast } = useAppStore();
  const { setStudent, user } = useAuthStore();

  const { data: studentData, isLoading, error } = useQuery({
    queryKey: ["student", user?.citizen_id],
    queryFn: async () => {
      console.log("Fetching student with citizen_id:", user.citizen_id);
      const { data } = await student.getStudentByCitizenId(user.citizen_id);
      console.log("Student API response:", data);
      setStudent(data.data.student);
      console.log('Student data fetched:', data.data.student);
      return data.data.student;
    },
    retry: false,
    enabled: !!user?.citizen_id && user?.role !== 'Admin',
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
    enabled: !!user?.citizen_id && user?.role !== 'Admin',
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
    isLoading,
    error,
    getStudent,
    getStudentByCitizenId,
    updateStudent,
    updateStudentDIDById,
  };
}
