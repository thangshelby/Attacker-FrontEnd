import { chatbot } from "@/apis/chatbot";
import { useMutation } from "@tanstack/react-query";

// Sử dụng guest account có sẵn trong DB
const LANDING_PAGE_CITIZEN_ID = "0000000000";

export const useLandingChatbot = () => {
  const sendMessage = useMutation({
    mutationFn: (message: string) => {
      // Sử dụng fake citizen_id cho landing page
      return chatbot.sendMessage({
        message,
        citizen_id: LANDING_PAGE_CITIZEN_ID,
      });
    },
    onSuccess: (data: any) => {
      console.log("Landing page chatbot message sent successfully");
    },
    onError: (error: any) => {
      console.error("Landing page chatbot error:", error);
    },
  });

  return { sendMessage };
};
