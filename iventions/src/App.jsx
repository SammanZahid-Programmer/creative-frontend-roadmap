import Hero from "./sections/Hero.jsx";
import SpotlightSection from "./components/SpotlightSection.jsx";
import ClientsSection from "./components/ClientsSection";
import EventsSection from "./components/EventsSection";
import ImpactSection from "./components/ImpactSection";
import StatsShowcase from "./components/StatsShowcase";
import RaporaSection from "./components/RaporaSection";
import InsightsSection from "./components/InsightsSection.jsx";
import QuoteContactSection from "./components/QuoteContactSection.jsx";
import FooterSection from "./components/FooterSection.jsx";

function App() {
  return (
    <>
      <Hero />
      <SpotlightSection />
      <ClientsSection />
      <EventsSection />
      <ImpactSection />
      <StatsShowcase />
      <RaporaSection />
      <InsightsSection />
      <QuoteContactSection />
      <FooterSection />
    </>
  );
}

export default App;