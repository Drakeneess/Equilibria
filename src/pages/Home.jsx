import Hero from "../components/Hero/hero";
import Navbar from "../components/Navbar/navbar";
import AboutUs from "../components/AboutUs/aboutUs";
import CEOSection from "../components/CEO/CEOSection";
import PromoBanner from "../components/PromoBanner/PromoBanner";
import Services from "../components/Services/Services";
import Footer from "../components/Footer/Footer";
import OurTechnology from "../components/OurTechnology/OurTechnology";
import Blog from "../components/Blog/Blog";
import Contact from "../components/Contact/Contact";
import usePageTitle from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle("Equilibria | Bienestar a tu alcance");

  return (
    <>
      <Navbar />

      <div className="hero-wrapper">
        <Hero/>
      </div>

      <AboutUs />
      <CEOSection />
      <Services />
      <OurTechnology />
      <Blog />
      <Contact />
      <PromoBanner />
      <Footer />
    </>
  );
}