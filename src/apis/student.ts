import api from "@/apis/api";

export const student = {
  getStudent: (citizen_id: string) => {
    return api.get(`/students/${citizen_id}`, {
      withCredentials: true,
    });
  },
  updateStudent: (data: any) =>
    api.put(`/students/update_student`, data, {
      withCredentials: true,
    }),

  // getAllUsers: () => {
  //   return api.get("/api/users/all_users", {
  //     withCredentials: true,
  //   });
  // },
  // getUsersBySchoolName: (schoolName) =>
  //   api.get(`/api/users/school/${schoolName}`, {
  //     withCredentials: true,
  //   }),
  // getUsersBySchoolId: (schoolId) =>
  //   api.get(`/api/users/school/${schoolId}`, {
  //     withCredentials: true,
  //   }),
  // getUsersByRole: (role) =>
  //   api.get(`/api/users/role/${role}`, {
  //     withCredentials: true,
  //   }),
  // updateStudentById: (id, data) =>
  //   api.put(`/api/students/update_student${id}`, data, {
  //     withCredentials: true,
  //   }),
  // updateStudentDIDById: (id, data) =>
  //   api.put(`/api/students/update_student_did/${id}`, data, {
  //     withCredentials: true,
  //   }),
  // deleteStudentById: (id) =>
  //   api.delete(`/api/users/delete_user/${id}`, {
  //     withCredentials: true,
  //   }),
};
