import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import Features from "../components/home/Features";
import Gallery from "../components/home/Gallery";
import Guide from "../components/home/Guide";
import Footer from "../components/layout/Footer";
import About from "../components/home/About";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Categories />
      <Features />
      <Gallery />
      <About />
      <Guide />
      <Footer />
    </div>
  );
}