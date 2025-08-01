import api from "./api";

export const user = {
  updateUser: (data) =>
    api.put(`/users/update_user`, data, {
      withCredentials: true,
    }),
  // getUserById: (id) =>
  //   axios.get(`/api/users/${id}`, {
  //     withCredentials: true,
  //   }),
  // getAllUsers: () => {
  //   return axios.get("/api/users/all_users", {
  //     withCredentials: true,
  //   });
  // },
  // getUsersBySchoolName: (schoolName) =>
  //   axios.get(`/api/users/school/${schoolName}`, {
  //     withCredentials: true,
  //   }),
  // getUsersBySchoolId: (schoolId) =>
  //   axios.get(`/api/users/school/${schoolId}`, {
  //     withCredentials: true,
  //   }),
  // getUsersByRole: (role) =>
  //   axios.get(`/api/users/role/${role}`, {
  //     withCredentials: true,
  //   }),
  // updateUserById: (id, data) =>
  //   axios.put(`/api/users/update_user${id}`, data, {
  //     withCredentials: true,
  //   }),
  // deleteUserById: (id) =>
  //   axios.delete(`/api/users/delete_user/${id}`, {
  //     withCredentials: true,
  //   }),
};
