import Header from "./ui/Header";
import Hero from "./ui/Hero";
import Section1 from "./ui/Section1";
import Section2 from "./ui/Section2";
import Section4 from "./ui/Section4";
import Footer from "./ui/Footer";
import Section5 from "./ui/Section5";
import Diagram from "./ui/Diagram";
import Section3Auto from "./ui/Section3.test";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />
      {/* Diagram */}
      <Diagram />
      {/* Section 1 */}
      <Section1 />
      {/* Section 2 */}
      <Section2 />
      {/* Section 3 */}
      <Section3Auto />
      {/* Section 4 */}
      <Section4 />
      {/* Section 5 */}
      <Section5 />
      {/* Footer */}
      <Footer />
    </div>
  );
}
