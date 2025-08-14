import React from "react";
import Header from "../../../components/user/landing/Header";
import Hero from "../../../components/user/landing/Hero";
import Features from "../../../components/user/landing/Feature";
import HowToUse from "../../../components/user/landing/HowToUse";
import Security from "../../../components/user/landing/Security";
import Benefit from "../../../components/user/landing/Benefit";
import FAQ from "../../../components/user/landing/FAQ";
import Testimonials from "../../../components/user/landing/Testimonial";
import CTA from "../../../components/user/landing/CTA";
import Footer from "../../../components/user/landing/Footer";
const LandingPage = () => {
  return (
    <div>
      <div className="overflow-hidden pt-[4.75rem] lg:pt-[5.25rem]">
        <Header />
        <Hero />
        <Features />
        <HowToUse />
        <Security />
        <Benefit />
        <FAQ />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
