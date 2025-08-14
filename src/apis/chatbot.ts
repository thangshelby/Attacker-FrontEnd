import api from "./api";

export const chatbot={
    sendMessage: async (data) => {
        const response = await api.post("/chat", data );
        return response.data;
    }
}