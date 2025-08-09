import { useQuery, useMutation } from "@tanstack/react-query";
import { loan } from "@/apis/loan";
import { useStudent } from "./useStudent";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { queryClient } from "../apis/react-query";


export function useLoan(loan_id) {
  const { student, isLoading } = useStudent();
  const [student_id, setStudent_id] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    if (student?.student_id) {
      setStudent_id(student.student_id);
    }
  }, [student, isLoading]);
  // Fetch all loans
  const {
    data: loans,
    isLoading: isLoadingLoans,
    error: loansError,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const { data } = await loan.getAllLoans();
      return data.data.loans;
    },
    onSuccess: (data) => {
      return data.data.loans;
    },
    // refetchOnWindowFocus: false,
  });

  const getMASConversation = useQuery({
    queryKey: ["masConversation", loan_id],
    queryFn: async () => {
      const { data } = await loan.getMassConversation(loan_id);
      return data.data.conversation;
    },
    enabled: !!loan_id,
  });
  // Fetch loan by student ID
  const getLoansByStudentId = useQuery({
    queryKey: ["loans", student_id],
    queryFn: async () => {
      const response = await loan.getLoanByStudentId(student_id);
      return response.data.data.loans;
    },
    enabled: !!student_id,
  });
  // Fetch loan by ID
  // const getLoanById = useQuery({
  //   queryKey: ["loan", { id: loanId }],
  //   queryFn: (loan_id) => loan.getLoanById(loan_id),
  //   enabled: true,
  // });

  const createLoanContract = useMutation({
    mutationFn: (data) => loan.create(data),
    onSuccess: (data) => {
      console.log("useLoan - Loan creation successful:", data);
      // Don't modify the response, just return as-is
      return data;
    },
    onError: (error) => {
      console.error("Error creating loan contract:", error);
    },
  });

  const updateLoanContract = useMutation({
    mutationFn: (data) => {
      return loan.update(data.loan_id, {
        ...data,  
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["loans"]);
      queryClient.invalidateQueries(["masConversation", data.loan_id]);
      return data;
    },
    onError: (error) => {
      console.error("Error updating loan contract:", error);
    },
  });

  return {
    loans,
    isLoadingLoans,
    loansError,
    getLoansByStudentId,
    getMASConversation,
    // getLoanById,
    createLoanContract,
    updateLoanContract,
  };
}
