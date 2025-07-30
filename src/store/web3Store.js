import { create } from "zustand";

export const useWeb3Store = create((set) => ({
    provider: null,
    signer: null,
    contract: null,
    connectedAccount: null,
    setProvider: (provider) => set({ provider }),
    setSigner: (signer) => set({ signer }),
    setContract: (contract) => set({ contract }),
    setConnectedAccount: (account) => set({ connectedAccount: account }),
    resetWeb3: () => set({ provider: null, signer: null, contract: null, connectedAccount: null }),
}));