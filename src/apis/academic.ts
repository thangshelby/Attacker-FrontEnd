import api from "./api";

export const academic = {
  getAcademicRecord: (studentId) => {
    return api.get("/academic/get_record/" + studentId, {
      withCredentials: true,
    });
  },
};
