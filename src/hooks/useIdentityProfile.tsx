import { identityProfile } from "@/apis/identityProfile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/appStore";

export function useIdentityProfile() {
  const { setToast } = useAppStore();
  const createIdentityProfile = useMutation({
    mutationFn: (data) => identityProfile.createIdentityProfile(data),
    onSuccess: (data) => {
      setToast({
        type: "success",
        message: "Identity profile created successfully!",
      });
    },
    onError: (error) => {
      console.error("Error creating identity profile:", error);
    },
  });
  return { createIdentityProfile };
}
