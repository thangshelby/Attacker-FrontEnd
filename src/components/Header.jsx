import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md dark:bg-gray-900">
      <h1 className="text-xl font-bold">My Website</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
