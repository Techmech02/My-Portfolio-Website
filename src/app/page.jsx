import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
      {/* Noise overlay for premium visual texture */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
