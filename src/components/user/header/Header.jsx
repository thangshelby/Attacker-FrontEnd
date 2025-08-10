import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  MoreVertical,
  X,
  CheckCircle,
  Menu,
  Globe,
  Sun,
  Moon,
  Wallet,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Shield,
} from "lucide-react";
import { ethers } from "ethers";
import { useWeb3Store } from "@/store/web3Store";
import { truncate } from "@/utils";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import HeaderNotification from "./HeaderNotification";

// Theme Toggle Component
const ThemeToggle = ({ isDark, setIsDark }) => {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      title="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

// Language Toggle Component
const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("vi");

  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        title="Change language"
      >
        <Globe size={18} />
        <span className="text-sm">
          {languages.find((l) => l.code === currentLang)?.flag}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLang(lang.code);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                currentLang === lang.code
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// MetaMask Connect Button
const MetaMaskButton = () => {
  const [isConnected, setIsConnected] = useState(false);
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
      setIsConnected(true);
      setProvider(provider);
      setConnectedAccount(address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  const disconnectWallet = () => {
    setConnectedAccount("");
    setIsConnected(false);
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 dark:border-green-800 dark:bg-green-900/20">
        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
        <Wallet size={16} className="text-green-600 dark:text-green-400" />
        <span className="text-sm font-medium text-green-700 dark:text-green-300">
          {truncate(connectedAccount)}
        </span>
        <button
          onClick={disconnectWallet}
          className="ml-2 text-gray-500 hover:text-red-500"
          title="Disconnect wallet"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnectWallet}
      disabled={connectedAccount}
      className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:bg-orange-300"
    >
      {connectedAccount? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet size={16} />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};


// User Menu Component
const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: User, label: "Hồ sơ cá nhân", href: "#" },
    { icon: Settings, label: "Cài đặt", href: "#" },
    { icon: Shield, label: "Bảo mật", href: "#" },
    { icon: LogOut, label: "Đăng xuất", href: "#", danger: true },
  ];

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
          alt="user avatar"
        />
        <div className="hidden min-w-0 leading-4 md:block">
          <h4 className="truncate font-bold text-gray-800 dark:text-gray-100">
            {user.name}
          </h4>
          <span className="block truncate text-xs font-medium text-gray-600 dark:text-gray-400">
            {user.email}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-gray-600 transition-transform dark:text-gray-400 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 p-3 dark:border-gray-700">
            <p className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
          </div>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                item.danger
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Header Component
const Header = ({ onToggleSidebar }) => {
  const [isDark, setIsDark] = useState(true);
  const notificationRef = useRef(null);
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 shadow-md md:px-6 dark:border-gray-700 dark:bg-gray-900">
      {/* Left Section */}
      <div className="flex flex-row items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 lg:hidden dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          title="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <span className="text-sm font-bold text-white">D</span>
          </div>
          <h1 className="hidden text-xl font-bold text-gray-900 sm:block dark:text-white">
            DAppCrypto
          </h1>
        </div>

        {/* Desktop Controls */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          <LanguageToggle />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* MetaMask Button */}
        <MetaMaskButton />

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          <LanguageToggle />
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <HeaderNotification notificationRef={notificationRef} />
        </div>
        {/* User Profile */}
        <UserMenu user={user} />
      </div>

      {/* Click outside handlers would go here */}
    </header>
  );
};

export default Header;
