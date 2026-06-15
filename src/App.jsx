import { useState, startTransition } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";

export default function App() {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (id) => {
    startTransition(() => setActiveModal(id));
  };

  const handleCloseModal = () => {
    startTransition(() => setActiveModal(null));
  };

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects onOpenModal={handleOpenModal} />
        <Stack />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ProjectModal modalId={activeModal} onClose={handleCloseModal} />
    </>
  );
}
