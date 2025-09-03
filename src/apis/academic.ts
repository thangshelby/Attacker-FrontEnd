import api from "./api";

export const academic = {
  getAcademicRecord: (studentId: string) => {
    return api.get("/academic/get_record/" + studentId, {
      withCredentials: true,
    });
  },
  create: (data: any) => {
    return api.post("/academic/create", data, {
      withCredentials: true,
    });
  },
  update: (studentId: string, data: any) => {
    return api.put(`/academic/update/${studentId}`, data, {
      withCredentials: true,
    });
  },
};
