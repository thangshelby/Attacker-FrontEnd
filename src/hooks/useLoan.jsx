import { useQuery, useMutation } from "@tanstack/react-query";
import { loan } from "@/apis/loan";
import { queryClient } from "../apis/react-query";

export function useLoans() {
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
  });

  // const getMASConversation = useQuery({
  //   queryKey: ["masConversation", loan_id],
  //   queryFn: async () => {
  //     const { data } = await loan.getMassConversation(loan_id);
  //     return data.data.conversation;
  //   },
  //   enabled: !!loan_id,
  // });

  // Fetch loan by ID
  // const getLoanById = useQuery({
  //   queryKey: ["loan", { id: loanId }],
  //   queryFn: (loan_id) => loan.getLoanById(loan_id),
  //   enabled: true,
  // });

  return {
    loans,
    isLoadingLoans,
    loansError,
    // getMASConversation,
  };
}

export function useLoan(loan_id) {
  const {
    data: selectedLoan,
    isLoading: isLoadingLoan,
    error: loanError,
  } = useQuery({
    queryKey: ["loan", loan_id],
    queryFn: async () => {
      const { data } = await loan.getLoanById(loan_id);
      return data.data.loan;
    },
    enabled: !!loan_id,
    onError: (error) => {
      console.error("Error fetching loan:", error);
    },
  });
  return {
    selectedLoan,
    isLoading: isLoadingLoan,
    error: loanError,
  };
}

export function useCreateLoan() {
  const { mutate: createLoan, isPending: createLoanPending } = useMutation({
    mutationFn: (data) => loan.create(data),
    onSuccess: (newLoan, variables) => {
      // Invalidate all loans queries
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      
      // If we have student_id, also invalidate student-specific loans
      if (variables.student_id) {
        queryClient.invalidateQueries({ queryKey: ["loans", variables.student_id] });
      }
    },
    onError: (error) => {
      console.error("Error creating loan:", error);
    },
  });
  return { createLoan, createLoanPending };
}

export function useUpdateLoan() {
  const { mutate: updateLoan, isPending: updateLoanPending } = useMutation({
    mutationFn: async ({ loan_id, data }) => {
      const response = await loan.update(loan_id, data);
      return response.data.loan;
    },
    onSuccess: (updatedLoan, variables) => {
      // Invalidate all loans queries
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      
      // // Also invalidate specific loan if we have the ID
      // if (variables.loan_id) {
      //   queryClient.invalidateQueries({ queryKey: ["loan", variables.loan_id] });
      // }
      
      // // If we have student_id, also invalidate student-specific loans
      // if (updatedLoan?.student_id) {
      //   queryClient.invalidateQueries({ queryKey: ["loans", updatedLoan.student_id] });
      // }
    },
    onError: (error) => {
      console.error("Error updating loan:", error);
    },
  });
  return { updateLoan, updateLoanPending };
}

export function useStudentLoans(student_id) {
  const {
    data: loans,
    isLoading: isLoadingLoans,
    error: loansError,
    refetch,
  } = useQuery({
    queryKey: ["loans", student_id],
    queryFn: async () => {
      const response = await loan.getLoanByStudentId(student_id);
      return response.data.data.loans;
    },
    enabled: !!student_id,
    refetchOnWindowFocus: true, // Refetch when window gets focus
    staleTime: 0, // Consider data stale immediately for fresh loans
  });
  return {
    loans,
    isLoadingLoans,
    loansError,
    refetch,
  };
}
