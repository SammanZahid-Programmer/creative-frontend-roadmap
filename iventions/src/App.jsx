import Hero from "./sections/Hero.jsx";
import SpotlightSection from "./components/SpotlightSection.jsx";
import ClientsSection from "./components/ClientsSection";
import EventsSection from "./components/EventsSection";
import ImpactSection from "./components/ImpactSection";

function App() {
  return (
    <>
      <Hero />
      <SpotlightSection />
      <ClientsSection />
      <EventsSection />
      <ImpactSection />
    </>
  );
}

export default App;