"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./ui/Header";
import Hero from "./ui/Hero";
import Section1 from "./ui/Section1";
import Section2 from "./ui/Section2";
import Section3 from "./ui/Section3";
import Section4 from "./ui/Section4";
import Footer from "./ui/Footer";
import Section5 from "./ui/Section5";
import Diagram from "./ui/Diagram";

export default function Home() {
  const [isHeroComplete, setIsHeroComplete] = useState(false);
  const rafIdRef = useRef<number>(0);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(() => {
      timeoutIdRef.current = setTimeout(() => {
        setIsHeroComplete(true);
      }, 2650);
    });

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {isHeroComplete ? (
        <>
          {/* Diagram */}
          <Diagram />
          {/* Section 1 */}
          <Section1 />
          {/* Section 2 */}
          <Section2 />
          {/* Section 3 */}
          <Section3 />
          {/* Section 4 */}
          <Section4 />
          {/* Section 5 */}
          <Section5 />
          {/* Footer */}
          <Footer />
        </>
      ) : (
        <div className="h-screen" aria-hidden={true} />
      )}
    </div>
  );
}
