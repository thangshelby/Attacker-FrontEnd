import { chatbot } from "@/apis/chatbot";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

export const useChatbot = () => {
  const { user } = useAuth();

  const sendMessage = useMutation({
    mutationFn: (message: string) => {
      if (!user) throw new Error("User not authenticated");

      return chatbot.sendMessage({
        message,
        citizen_id: user.citizen_id,
      });
    },
    onSuccess: (data: any) => {},
    onError: (error: any) => {
      console.error("Error sending message:", error);
    },
  });

  return { sendMessage };
};
