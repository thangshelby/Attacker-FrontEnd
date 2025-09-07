import api from "./api";
import { Loan } from "@/types";

export const loan = {
  getAllLoans: () => {
    return api.get("/loans", {
      withCredentials: true,
    });
  },
  getLoanById: (loan_id: string) => {
    return api.get(`/loans/${loan_id}`, {
      withCredentials: true,
    });
  },
  getLoanByStudentId: (student_id: string) => {
    return api.get(`/loans/student/${student_id}`, {
      withCredentials: true,
    });
  },
  getMassConversation: (loan_id: string) => {
    return api.get(`/loans/mas/${loan_id}`, {
      withCredentials: true,
    });
  },
  checkCanCreateLoan:(user_id:string) => {
    return api.get(`/loans/can_create_loan/${user_id}`, {
      withCredentials: true,
    });
  },
  create: (data: Partial<Loan>) => {
    return api.post("/loans/contract", data, {
      withCredentials: true,
    });
  },
  update: (loan_id: string, data: Partial<Loan>) => {
    return api.put(`/loans/${loan_id}`, data, {
      withCredentials: true,
    });
  },
  analyze:(data:any)=>{
    return api.post("/loans/analyze",data,{
      withCredentials: true,
    })
  },
  getLoans: () => {
    return api.get("/loan", {
      withCredentials: true,
    });
  },
};
