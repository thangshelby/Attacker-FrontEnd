import { appLogo } from "../../../assets";
import { footerLinks } from "./constants";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Phần nội dung chính của footer */}
        <div className="grid grid-cols-1 gap-8 border-b border-gray-200 pb-12 md:grid-cols-12">
          {/* Cột logo và mô tả (chiếm nhiều không gian hơn) */}
          <div className="md:col-span-12 lg:col-span-6">
            <div className="flex items-center gap-2">
              <img
                src={appLogo}
                alt="StudentCredit Logo"
                className="h-8 w-auto"
              />
            </div>
            <div>
              <p className="mt-4 w-3/5 text-gray-600">
                StudentCredit là nền tảng tín dụng thông minh, được thiết kế để
                giúp sinh viên Việt Nam xây dựng nền tảng tài chính và mở lối
                tương lai.
              </p>
            </div>
          </div>

          {/* Các cột link */}
          <div className="md:col-span-6 lg:col-span-2">
            <h3 className="font-semibold text-gray-900">Short links</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shortLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 transition hover:text-purple-600"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6 lg:col-span-2">
            <h3 className="font-semibold text-gray-900">Other pages</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.otherPages.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 transition hover:text-purple-600"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-sm text-gray-500">
          <p>
            Copyright © {new Date().getFullYear()} StudentCredit. All Rights
            Reserved.
          </p>
          <p className="mt-1">Attacker2025 - FlyingCololor3</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
