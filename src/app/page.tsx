import Section1 from "./ui/Section1";
import HeroSection from "./ui/HeroSection";
import Header from "./ui/Header";
import Section2 from "./ui/Section2";
import Section3 from "./ui/Section3";
import Section4 from "./ui/Section4";
import Footer from "./ui/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Section 1 */}
      <Section1 />

      {/* Section 2 */}
      <Section2 />

      {/* Section 3 */}
      <Section3 />

      {/* Section 4 */}
      <Section4 />

      {/* Footer */}
      <Footer />
    </div>
  );
}
