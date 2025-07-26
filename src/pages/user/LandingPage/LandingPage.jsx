import React from "react";
import { useAuthStore } from "../../../store/authStore";
import Header from "../../../components/landing/Header";
import Hero from "../../../components/landing/Hero";
import Features from "../../../components/landing/Feature";
import HowToUse from "../../../components/landing/HowToUse";
import Security from "../../../components/landing/Security";
import Benefit from "../../../components/landing/Benefit";
import FAQ from "../../../components/landing/FAQ";
import Testimonials from "../../../components/landing/Testimonial";
import CTA from "../../../components/landing/CTA";
import Footer from "../../../components/landing/Footer";
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
