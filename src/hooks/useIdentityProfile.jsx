import { identityProfile } from "@/apis/identityProfile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/appStore";
import { create } from "zustand";

export function useIdentityProfile() {
  const createIdentityProfile = useMutation({
    mutationFn: (data) => identityProfile.createIdentityProfile(data),
    onSuccess: (data) => {
      console.log("Identity profile created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating identity profile:", error);
    },
  });
  return createIdentityProfile;
}
