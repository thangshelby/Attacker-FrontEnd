import api from "./api";

export const auth = {
  login: (data:any) =>
    api.post("/users/login", data, {
      withCredentials: true,
    }),
  register: (data:any) =>
    api.post("/users/register", data, {
      withCredentials: true,
    }),
  verifyEmail: (data:any) =>
    api.post("/users/verify-email", data, {
      withCredentials: true,
    }),
  resendOtp:(email:string)=>{
    return api.post("/users/resend-otp", { email });
  },
  getCurrentUser: () =>
    api.get("/users/get-me", {
      withCredentials: true,
    }),
  logout: () =>
    api.post("/users/logout", {
      withCredentials: true,
    }),
};
