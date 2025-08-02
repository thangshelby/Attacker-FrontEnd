import api from "./api";

export const identityProfile = {
  createIdentityProfile: (data) =>
    api.post("identity/create_identity", data, {
      withCredentials: true,
    }),
  // getProfileById: (id) =>
  //   api.get(`/identity_profile/${id}`, {
  //     withCredentials: true,
  //   }),
  // updateProfileById: (id, data) =>
  //   api.put(`/identity_profile/${id}`, data, {
  //     withCredentials: true,
  //   }),
  // deleteProfileById: (id) =>
  //   api.delete(`/identity_profile/${id}`, {
  //     withCredentials: true,
  //   }),
};
