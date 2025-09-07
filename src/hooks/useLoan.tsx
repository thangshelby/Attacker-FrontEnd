import { useQuery, useMutation } from "@tanstack/react-query";
import { loan } from "@/apis/loan";
import { queryClient } from "../apis/react-query";
import { Loan, UpdateLoanParams } from "@/types";
// Define interface for update loan parameters

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
  });

  return {
    loans,
    isLoadingLoans,
    loansError,
    // getMASConversation,
  };
}
export function useMASConversation(loan_id: string | undefined) {
  const {
    data: masConversation,
    isLoading: isLoadingMASConversation,
    error: masConversationError,
  } = useQuery({
    queryKey: ["masConversation", loan_id],
    queryFn: async () => {
      const { data } = await loan.getMassConversation(loan_id!);
      return data.data.conversation;
    },
    enabled: !!loan_id,
  });
  return {
    masConversation,
    isLoadingMASConversation,
    masConversationError,
  };
}

export function useAnalyzeLoan() {
  const { mutate: analyzeLoan, isPending: analyzeLoanPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await loan.analyze(data);
      return response.data;
    },

    onError: (error) => {
      console.error("Error analyzing loan:", error);
    },
  });
  return { analyzeLoan, analyzeLoanPending };
}

export function useCanCreateLoan(user_id: string) {
  const {
    data: canCreateLoan,
    isLoading: isLoadingCanCreateLoan,
    error: canCreateLoanError,
  } = useQuery({
    queryKey: ["canCreateLoan", user_id],
    queryFn: async () => {
      const { data } = await loan.checkCanCreateLoan(user_id);

      return data
    },
    enabled: !!user_id,
  });
  return {
    canCreateLoan,
    isLoadingCanCreateLoan,
    canCreateLoanError,
  };
}

export function useLoan(loan_id: string) {
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
  });
  return {
    selectedLoan,
    isLoading: isLoadingLoan,
    error: loanError,
  };
}

export function useCreateLoan() {
  const { mutate: createLoan, isPending: createLoanPending } = useMutation({
    mutationFn: async (data: Partial<Loan>) => {
      const response = await loan.create(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate all loans queries
      queryClient.invalidateQueries({ queryKey: ["loans"] });

      // If we have student_id, also invalidate student-specific loans
      if (variables.student_id) {
        queryClient.invalidateQueries({
          queryKey: ["loans", variables.student_id],
        });
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
    mutationFn: async ({ loan_id, data }: UpdateLoanParams) => {
      const response = await loan.update(loan_id, data);
      return response.data.loan;
    },
    onSuccess: (_, variables) => {
      // Invalidate all loans queries
      queryClient.invalidateQueries({ queryKey: ["loans"] });

      // Also invalidate specific loan if we have the ID
      if (variables.loan_id) {
        queryClient.invalidateQueries({
          queryKey: ["loan", variables.loan_id],
        });
      }

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

export function useStudentLoans(student_id: string) {
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
