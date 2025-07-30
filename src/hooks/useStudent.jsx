import api from "@/apis/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/appStore";

export function useStudent() {
  const updateStudent = useMutation({
    mutationFn: (data) => api.updateStudent(data),
    onSuccess: (data) => {
      console.log("Student updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating student:", error);
    },
  });

  const updateStudentDIDById = useMutation({
    mutationFn: (id, data) => api.updateStudentById(id, data),
    onSuccess: (data) => {
      console.log("Student DID updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating student DID:", error);
    },
  });

  return {
    updateStudent,
    updateStudentDIDById,
  }
}
