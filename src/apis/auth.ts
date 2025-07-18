import api from "./api";

export const auth = {
  login: (credentials) =>
    api.post("/users/login", credentials, {
      withCredentials: true,
    }),
  register: (data) =>
    api.post("/users/sign-up", data, {
      withCredentials: true,
    }),
//   getCurrentUser: () =>
//     api.get("/users/get-me", {
//       withCredentials: true
//     }),
//   logout: () =>
//     api.post("/users/logout", {}, {
//       withCredentials: true
//     }),
};  