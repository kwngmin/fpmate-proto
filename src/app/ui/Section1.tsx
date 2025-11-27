"use client";

import { useIntersectionObserver } from "@/shared/lib/use-intersection-observer";
import { Card } from "@/shared/ui";
import { BlurFadeDiv, BlurFadeText } from "@/shared/ui/BlurFadeText";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Section 1 카드 데이터
 */
const section1Contents = [
  {
    id: 1,
    title: "SW 사업을 기획하고 계신가요?",
    description: "FPMate에서 필요한 비용을 알아보세요.",
    image: "/assets/images/section1-lamp.png",
  },
  {
    id: 2,
    title: "SW 사업을 진행하고 계신가요?",
    description: "FPMate로 프로젝트의 비용을 추척해보세요.",
    image: "/assets/images/section1-play.png",
  },
  {
    id: 3,
    title: "SW 사업이 완료되셨나요?",
    description: "FPMate로 운영에 필요한 비용을 알아보세요.",
    image: "/assets/images/section1-check.png",
  },
];

const Section1 = () => {
  const [section1Step, setSection1Step] = useState<number>(1);
  const [section1ContainerWidth, setSection1ContainerWidth] =
    useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const section1ContainerRef = useRef<HTMLDivElement>(null);

  // 카드 상수
  const SECTION1_CARD_WIDTH = 288; // min-w-72 = 18rem = 288px
  const SECTION1_CARD_GAP = 8; // gap-2

  // 화면 크기 감지 및 컨테이너 너비 측정
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1024);

      if (section1ContainerRef.current) {
        setSection1ContainerWidth(section1ContainerRef.current.clientWidth);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Section1 translateX 계산
  const section1TranslateX = useMemo(() => {
    if (!isMobile || section1ContainerWidth === 0) return 0;

    const PADDING = 48;
    const visibleWidth = section1ContainerWidth - PADDING;
    const totalCards = section1Contents.length;
    const carouselWidth =
      totalCards * SECTION1_CARD_WIDTH + (totalCards - 1) * SECTION1_CARD_GAP;

    if (section1Step === 1) {
      // 첫번째: 왼쪽 가장자리에서 24px (기본 위치)
      return 0;
    } else if (section1Step === 2) {
      // 두번째: 가운데
      const cardLeftPosition = SECTION1_CARD_WIDTH + SECTION1_CARD_GAP;
      const cardCenter = cardLeftPosition + SECTION1_CARD_WIDTH / 2;
      const containerCenter = visibleWidth / 2;
      return cardCenter - containerCenter;
    } else {
      // 세번째: 오른쪽 가장자리에서 24px
      return carouselWidth - visibleWidth;
    }
  }, [section1Step, section1ContainerWidth, isMobile]);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
  });

  console.log(isIntersecting);

  return (
    <section ref={ref} className="bg-gray-50 py-20 md:py-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-2">
        <div className="text-[2rem] md:text-[3rem] leading-[1.15] tracking-tighter font-semibold break-keep">
          <span className="font-extrabold text-brand-primary">FPMate</span>는?{" "}
        </div>
        <p className="max-w-96 sm:max-w-none text-[1.5rem] md:text-[2rem] leading-tight tracking-tighter break-keep text-text-primary">
          <span className="font-semibold">SW 사업 파트너</span>
          로서 <span className="font-semibold">SW 사업 관리</span>를 돕고자
          탄생하였습니다.
        </p>
      </div>

      {/* 카드 영역 - 1024px 이하에서 캐로셀 */}
      <div className="w-full py-4 overflow-hidden lg:overflow-visible">
        <div
          ref={section1ContainerRef}
          className="max-w-[1200px] mx-auto px-6 overflow-visible"
          style={{
            perspective: isMobile ? "1000px" : "none",
          }}
        >
          <div
            className="flex gap-2 transition-transform duration-500 ease-out"
            style={{
              transform: isMobile
                ? `translateX(-${section1TranslateX}px)`
                : "none",
              width: isMobile ? "max-content" : "auto",
              transformStyle: "preserve-3d",
            }}
          >
            {section1Contents.map((content, index) => (
              <Card
                key={content.id}
                variant="elevated"
                padding="none"
                className={`grow min-w-72 shrink-0 transition-all duration-500 ease-out ${
                  isMobile ? "cursor-pointer" : ""
                } ${
                  isMobile && content.id === section1Step
                    ? "scale-100 opacity-100"
                    : isMobile
                    ? "scale-[0.98] opacity-70"
                    : ""
                }`}
                onClick={() => isMobile && setSection1Step(content.id)}
              >
                <div className="flex flex-col gap-1 items-center px-4 pt-6 pb-8">
                  <BlurFadeDiv
                    delay={(index + 1) * 100}
                    intersectionOptions={{
                      threshold: 0.5,
                    }}
                    useIntersection={true}
                  >
                    {/* image */}
                    <Image
                      src={content.image}
                      alt={`section1-${content.id}`}
                      width={124}
                      height={124}
                      className="shrink-0 size-28 mb-2"
                    />
                  </BlurFadeDiv>

                  {/* title */}
                  <BlurFadeText
                    className="text-lg tracking-tight font-semibold break-keep"
                    text={content.title}
                    delay={100 + (index + 1) * 200}
                    useIntersection={true}
                    intersectionOptions={{
                      threshold: 0.5,
                    }}
                  />

                  {/* description */}
                  <BlurFadeText
                    className="text-[1.0625rem] leading-normal text-center break-keep max-w-48"
                    text={content.description}
                    delay={200 + (index + 1) * 300}
                    useIntersection={true}
                    intersectionOptions={{
                      threshold: 0.5,
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1 Description */}
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-[0.9375rem] leading-normal tracking-tight break-keep text-text-secondary">
          <span className="font-semibold">FPMate</span>에서는{" "}
          <span className="font-medium">국제표준</span>(ISO/IEC 14143)에 기반한
          방법으로 <span className="font-medium">SW 사업 비용을 산정</span>
          합니다.
        </p>
      </div>
    </section>
  );
};

export default Section1;
