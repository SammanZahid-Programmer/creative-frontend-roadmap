import Loader from "./components/Loader";
import Hero from "./components/Hero";
import ModelGallery from "./components/ModelGallery";
import Mission from "./components/Mission";
import Technology from "./components/Technology";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main>
      <Loader />
      <Hero />
      <ModelGallery />
      <Mission />
      {/* <Technology /> */}
      <Footer />
    </main>
  );
}
