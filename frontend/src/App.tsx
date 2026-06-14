import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import PlannerSuite from './components/PlannerSuite';
import Showcase from './components/Showcase';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Background glowing elements (Apple style blur) */}
      <div className="glowing-bg-elements" aria-hidden="true">
        <div className="glow-circle glow-circle-1" />
        <div className="glow-circle glow-circle-2" />
        <div className="glow-circle glow-circle-3" />
      </div>

      {/* Sticky navigation bar */}
      <Header />

      {/* Primary landing layout elements */}
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <PlannerSuite />
        <Showcase />
      </main>

      {/* Site footer */}
      <Footer />
    </>
  );
}
