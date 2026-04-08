import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Materials from "@/components/Materials";
import Estimator from "@/components/Estimator";
import PhotoEstimator from "@/components/PhotoEstimator";
import Reviews from "@/components/Reviews";
import Trust from "@/components/Trust";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LogoIntro from "@/components/LogoIntro";

const queryClient = new QueryClient();

function HomePage() {
  return (
    <>
      <LogoIntro />
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Materials />
      <Trust />
      <Estimator />
      <PhotoEstimator />
      <Reviews />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">404</h1>
        <a href="/" className="text-green-400 hover:text-green-300 underline">Return Home</a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
