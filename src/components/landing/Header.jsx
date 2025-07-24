import { useState } from "react";
import { useLocation } from "react-router-dom";
import { appLogo } from "../../assets";
import { navigation } from "./constants";
import { HamburgerMenu } from "./designs/Header";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import MenuSvg from "../../assets/customs/svg/MenuSvg";
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
      className={`fixed top-0 left-0 z-50 w-full lg:bg-transparent lg:backdrop-blur-sm ${
        openNavigation ? "bg-transparent" : "bg-transparent backdrop-blur-sm"
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
                className={`font-code text-primary hover:text-color-1 relative block text-2xl uppercase transition-colors ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "lg:text-n-1 z-2"
                    : "lg:text-n-1/50"
                } lg:hover:text-n-1 lg:leading-5 xl:px-12`}
              >
                {item.title}
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
          } hidden items-center lg:flex`}
        >
          <Button
            variant="primary"
            className="bg-blue-500 text-white"
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
