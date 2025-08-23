import { useState } from "react";
import { useLocation } from "react-router-dom";
import { appLogo } from "../../../assets";
import { navigation } from "./constants";
import { HamburgerMenu } from "./designs/Header";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import MenuSvg from "../../../assets/customs/svg/MenuSvg";
import Button from "../elements/Button";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };
  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };
  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        openNavigation ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white/80 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="flex items-center px-5 max-lg:py-4 lg:px-7.5 xl:px-10">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={appLogo} alt="logo" width={190} height={60} />
        </a>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] right-0 bottom-0 left-0 bg-white lg:static lg:mx-auto lg:flex lg:bg-transparent`}
        >
          <div className="relative z-2 m-auto flex flex-col items-center justify-center lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`relative block font-medium transition-all duration-300 hover:scale-105 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:px-4 xl:px-6 text-xl lg:text-base ${
                  item.url === pathname.hash
                    ? "text-purple-600 font-semibold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                <span className="relative z-10">{item.title}</span>
                {item.url === pathname.hash && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                )}
              </a>
            ))}
            <div className="mt-8 lg:hidden">
              <Button variant="primary" to="/auth/login" onClick={handleClick}>
                Đăng nhập
              </Button>
            </div>
          </div>
          <HamburgerMenu />
        </nav>

        <div
          className={`${
            openNavigation ? "hidden" : "flex"
          } hidden items-center gap-3 lg:flex`}
        >
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
            to="/auth/register"
            size="sm"
          >
            Đăng ký
          </Button>
          <Button
            variant="primary"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            to="/auth/login"
            size="sm"
          >
            Đăng nhập
          </Button>
        </div>

        <div className="flex items-center lg:hidden">
          <HamburgerMenu onClick={toggleNavigation} />
        </div>

        {/* Hamburger menu icon - dành cho giao diện nhỏ - responsive */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto px-3 lg:hidden"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
