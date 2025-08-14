import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";

import PlusSvg from "../../../../assets/customs/svg/PlusSvg";

export const Gradient = () => {
  return (
    <>
      <div className="relative z-1 mx-2.5 h-6 rounded-b-[1.25rem] bg-black shadow-xl lg:mx-8 lg:h-6" />
      <div className="relative z-1 mx-6 h-6 rounded-b-[1.25rem] bg-black/70 shadow-xl lg:mx-20 lg:h-6" />
    </>
  );
};

export const BottomLine = () => {
  return (
    <>
      <div className="pointer-events-none absolute top-[55.25rem] right-10 left-10 hidden h-0.25 bg-black xl:block" />

      <PlusSvg className="pointer-events-none absolute top-[54.9375rem] left-[2.1875rem] z-2 hidden xl:block" />

      <PlusSvg className="pointer-events-none absolute top-[54.9375rem] right-[2.1875rem] z-2 hidden xl:block" />
    </>
  );
};

const Rings = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 aspect-square w-[65.875rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10" />
      <div className="absolute top-1/2 left-1/2 aspect-square w-[51.375rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10" />
      <div className="absolute top-1/2 left-1/2 aspect-square w-[36.125rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10" />
      <div className="absolute top-1/2 left-1/2 aspect-square w-[23.125rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10" />
    </>
  );
};

export const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[42.375rem] left-1/2 aspect-square w-[78rem] -translate-x-1/2 rounded-full border border-black/5 md:-top-[38.5rem] xl:-top-[32rem]">
      <Rings />

      {/* Moving background colored circle balls */}
      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-0.25 origin-bottom rotate-[46deg]">
          <div
            className={`-mt-36 -ml-1 h-2 w-2 rounded-full bg-gradient-to-b from-[#DD734F] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-0.25 origin-bottom -rotate-[56deg]">
          <div
            className={`-mt-32 -ml-1 h-4 w-4 rounded-full bg-gradient-to-b from-[#DD734F] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-0.25 origin-bottom rotate-[54deg]">
          <div
            className={`transit mt-[12.9rem] -ml-1 hidden h-4 w-4 rounded-full bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] transition-transform duration-500 ease-out xl:block ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-0.25 origin-bottom -rotate-[65deg]">
          <div
            className={`mt-52 -ml-1.5 h-3 w-3 rounded-full bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-0.25 origin-bottom -rotate-[85deg]">
          <div
            className={`-mt-3 -ml-3 h-6 w-6 rounded-full bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-0.25 origin-bottom rotate-[70deg]">
          <div
            className={`-mt-3 -ml-3 h-6 w-6 rounded-full bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>
      </MouseParallax>
    </div>
  );
};
