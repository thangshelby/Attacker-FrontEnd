import api from "./api";

export const loan = {
  getAllLoans: () => {
    return api.get("/loans", {
      withCredentials: true,
    });
  },
  getLoanById: (loan_id) => {
    return api.get(`/loans/${loan_id}`, {
      withCredentials: true,
    });
},
  getLoanByStudentId: (student_id) => {
    return api.get(`/loans/student/${student_id}`, {
      withCredentials: true,
    });
  },
  getMassConversation: (loan_id) => {
    return api.get(`/loans/mas/${loan_id}`, {
      withCredentials: true,
    });
  },
  create: (data) => {
    return api.post("/loans/contract", data, {
      withCredentials: true,
    });
  },
  update:(loan_id, data) => {
    console.log("Updating loan with ID:", loan_id, "and data:", data);
    return api.put(`/loans/${loan_id}`, data, {
      withCredentials: true,
    });
  },
  getLoans: () => {
    return api.get("/loan", {
      withCredentials: true,
    });
  },
};
