import api from "./api";

export const auth = {
  login: (data) =>
    api.post("/users/login", data, {
      withCredentials: true,
    }),
  register: (data) =>
    api.post("/users/register", data, {
      withCredentials: true,
    }),
  verifyEmail: (data) =>
    api.post("/users/verify-email", data, {
      withCredentials: true,
    }),
  getCurrentUser: () =>
    api.get("/users/get-me", {
      withCredentials: true,
    }),
  logout: () =>
    api.post("/users/logout", {
      withCredentials: true,
    }),
};
