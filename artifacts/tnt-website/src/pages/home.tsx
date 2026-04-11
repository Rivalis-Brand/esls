import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import About from "@/components/About";
import CtaBanner from "@/components/CtaBanner";
import Gallery from "@/components/Gallery";
import Estimator from "@/components/Estimator";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <CtaBanner />
      <Gallery />
      <Estimator />
      <Reviews />
      <Footer />
    </div>
  );
}
