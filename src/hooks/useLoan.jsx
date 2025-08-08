import { useQuery, useMutation } from "@tanstack/react-query";
import { loan } from "@/apis/loan";
import { useStudent } from "./useStudent";
import { useState, useEffect } from "react";

export function useLoan(loan_id) {
  const { student, isLoading } = useStudent();
  const [student_id, setStudent_id] = useState("");
  useEffect(() => {
    if (student) {
      setStudent_id(student.student_id);
    }
  }, [isLoading]);
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
    enabled: !!loan_id
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
      console.log("Loan contract created successfully:", data);
      //   const { data } = data;
    },
    onError: (error) => {
      console.error("Error creating loan contract:", error);
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
  };
}
