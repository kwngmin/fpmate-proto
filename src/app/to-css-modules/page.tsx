import Hero from "./ui/Hero";
import Section1 from "./ui/Section1";
import Section2 from "./ui/Section2";
import Section3 from "./ui/Section3";
import Section4 from "./ui/Section4";
import Section5 from "./ui/Section5";
import Footer from "./ui/Footer";
import Header from "../ui/Header";
import { Diagram } from "./ui";

export default function ToCssModules() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Diagram />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
    </div>
  );
}
