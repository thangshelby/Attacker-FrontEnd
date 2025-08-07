import { useQuery, useMutation } from "@tanstack/react-query";
import { loan } from "@/apis/loan"; // Adjust the import path as necessary
// import {}
export function useLoan() {
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
      console.log("Loans fetched successfully:", data.data.loans);
      return data.data.loans;
    },
    // refetchOnWindowFocus: false,
  });
  const getMASConversation = useQuery({
    queryKey: ["masConversation"],
    queryFn: async (loan_id) => {
      const { data } = await loan.getMassConversation(loan_id);
      return data.data.conversation;
    },
    enabled: false, // This will be called manually
  })
  // Fetch loan by student ID
  // const getLoansByStudentId = useQuery({
  //   queryKey: ["studentLoans", { studentId: user?.student_id }],
  //   queryFn: (student_id) => loan.getLoanByStudentId(student_id),
  //   enabled: !!user?.student_id,
  // });
  // Fetch loan by ID
  // const getLoanById = useQuery({
  //   queryKey: ["loanById", { id: loanId }],
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
    // getLoansByStudentId,
    // getLoanById,
    createLoanContract,
  };
}
