import ThemeToggle from "./ThemeToggle";
import { ethers } from "ethers";
import { useWeb3Store } from "../store/web3Store";
import { toast } from "react-toastify";
import { truncate } from "../utils";

const Header = () => {
  const { setProvider, connectedAccount, setConnectedAccount } = useWeb3Store();

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      toast.error(
        "MetaMask is not installed! Please install it to connect your wallet.",
      );
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setConnectedAccount(address);

      console.log("Wallet connected successfully!");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md dark:bg-gray-900">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-xl font-bold">My Website</h1>
        <ThemeToggle />
      </div>
      {connectedAccount ? (
        <button className="cursor-pointer rounded-3xl bg-blue-200 border border-blue-500 px-4 py-2 font-semibold text-blue-500 transition-colors hover:bg-blue-500 hover:text-white">
          {truncate(connectedAccount, 4, 4, 11)}
        </button>
      ) : (
        <button
          className="cursor-pointer rounded-3xl bg-blue-200 border border-blue-500 px-4 py-2 font-semibold text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default Header;
