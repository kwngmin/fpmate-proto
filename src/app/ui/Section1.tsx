"use client";

import { useIntersectionObserver } from "@/shared/lib/use-intersection-observer";
import { Card } from "@/shared/ui";
import ConnectionLines from "@/shared/ui/ConnectionLines";
import { FadeDiv, FadeText } from "@/shared/ui/FadeMotion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const features = [
  {
    title: "신규 개발",
    description: "초기 개발 규모 산정의 정확도 향상",
    icon: "magic-wand",
  },
  {
    title: "유지보수",
    description: "변경개선 요청에 대한 업무량 산정의 객관성과 신뢰도 향상",
    icon: "toolbox",
  },
  {
    title: "발주사",
    description: "견적 비교와 기능점수 검증에 효과적으로 대응",
    icon: "building-office",
  },
  {
    title: "개발사",
    description: "견적제안서 작성에 필요한 기능점수 기반 근거 자료 자동 생성",
    icon: "code",
  },
];

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

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  return (
    <section
      ref={ref}
      className="bg-gray-50 py-20 md:py-40 overflow-hidden space-y-2 sm:space-y-6"
    >
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-4">
        {/* <div className="text-[2rem] md:text-[3rem] leading-[1.15] tracking-tighter font-semibold break-keep">
          <span className="font-extrabold text-brand-primary">FPMate</span>는?{" "}
        </div> */}
        <p className="max-w-96 sm:max-w-none text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] leading-tight tracking-tighter break-keep text-text-primary">
          <span className="font-extrabold text-brand-primary">FPMate</span>는{" "}
          <span className="font-semibold">SW 사업 파트너</span>
          로서 <br />
          <span className="font-semibold">SW 사업 관리</span>를 돕고자
          탄생하였습니다.
        </p>

        <p className="text-[1.0625rem] leading-normal tracking-tight break-keep text-text-secondary">
          <span className="font-semibold">FPMate</span>에서는{" "}
          <span className="font-medium">국제표준</span>(ISO/IEC 14143)에 기반한
          방법으로 <span className="font-medium">SW 사업 비용을 산정</span>
          합니다.
        </p>
        {/* Section 1 Description */}
        {/* <div className="max-w-[1200px] mx-auto px-6">
        
      </div> */}
      </div>

      <div>
        {/* 카드 영역 - 1024px 이하에서 캐로셀 */}
        <div className="w-full py-4 lg:py-0 overflow-hidden lg:overflow-visible relative">
          <div
            ref={section1ContainerRef}
            className="max-w-[1200px] mx-auto px-6 overflow-visible relative z-10"
            style={{
              perspective: isMobile ? "1000px" : "none",
            }}
          >
            <div
              className="grid grid-cols-3 gap-2 lg:gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: isMobile
                  ? `translateX(-${section1TranslateX}px)`
                  : "none",
                width: isMobile ? "max-content" : "auto",
                transformStyle: "preserve-3d",
              }}
            >
              {section1Contents.map((content) => (
                <Card
                  key={content.id}
                  padding="none"
                  className={`grow min-w-72 shrink-0 transition-[outline, scale,opacity] duration-500 ease-out group select-none hover:shadow-xl hover:shadow-black/5 ${
                    isMobile ? "cursor-pointer" : ""
                  } ${
                    isMobile && content.id === section1Step
                      ? "scale-100 opacity-100 outline"
                      : isMobile
                      ? "scale-[0.98] opacity-70"
                      : ""
                  }`}
                  onClick={() => isMobile && setSection1Step(content.id)}
                >
                  <div className="flex flex-col gap-1 items-center px-4 pt-8 pb-10">
                    <FadeDiv
                      intersectionOptions={{
                        threshold: 0.5,
                      }}
                      hasBlur={false}
                      useIntersection={!isMobile}
                    >
                      {/* image */}
                      <Image
                        src={content.image}
                        alt={`section1-${content.id}`}
                        width={124}
                        height={124}
                        className="shrink-0 size-28 group-hover:scale-110 transition-[scale,opacity] duration-500 ease-out mb-2"
                      />
                    </FadeDiv>

                    {/* title */}
                    <FadeText
                      className="text-lg tracking-tight font-semibold break-keep"
                      text={content.title}
                      hasBlur={false}
                      useIntersection={!isMobile}
                      intersectionOptions={{
                        threshold: 0.5,
                      }}
                    />

                    {/* description */}
                    <FadeText
                      className="text-base leading-normal text-center break-keep max-w-48 text-text-secondary"
                      text={content.description}
                      hasBlur={false}
                      useIntersection={!isMobile}
                      intersectionOptions={{
                        threshold: 0.5,
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* navigation buttons for mobile */}
            <div className="flex lg:hidden items-center gap-2 mt-4">
              <button
                type="button"
                onClick={() =>
                  section1Step > 1 && setSection1Step(section1Step - 1)
                }
                className={`size-11 flex items-center justify-center bg-zinc-700 rounded-full cursor-pointer shadow-md shadow-black/5 hover:shadow-black/10 active:scale-95 ${
                  section1Step > 1 ? "opacity-100" : "opacity-50"
                }`}
              >
                <Image
                  src="/assets/svgs/caret-left.svg"
                  alt="caret-left"
                  width={24}
                  height={24}
                  className="size-6 brightness-0 invert"
                />
              </button>
              <button
                type="button"
                onClick={() =>
                  section1Step < section1Contents.length &&
                  setSection1Step(section1Step + 1)
                }
                className={`size-11 flex items-center justify-center bg-zinc-700 rounded-full cursor-pointer shadow-md shadow-black/5 hover:shadow-black/10 active:scale-95 ${
                  section1Step < section1Contents.length
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              >
                <Image
                  src="/assets/svgs/caret-right.svg"
                  alt="caret-right"
                  width={24}
                  height={24}
                  className="size-6 brightness-0 invert"
                />
              </button>
            </div>
          </div>
        </div>

        {/* 연결선 애니메이션 영역 */}
        <div className="relative max-w-[1200px] mx-auto w-full h-24 hidden lg:block">
          <ConnectionLines />
        </div>

        {/* Feature 영역 */}
        <div className="max-w-[1200px] mx-auto px-6 relative z-30 space-y-6 mt-6 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 lg:gap-x-4 gap-y-2 sm:gap-y-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border-t border-border-primary sm:px-4 py-6 md:px-6 sm:bg-white hover:border-accent-hover z-10"
              >
                <div className="text-[1.0625rem] leading-tight tracking-tighter text-text-primary max-w-96 break-keep font-medium mb-2 flex items-center gap-2">
                  <Image
                    src={`/assets/svgs/${feature.icon}.svg`}
                    alt={feature.title}
                    width={16}
                    height={16}
                    className="size-5"
                  />
                  {feature.title}
                </div>
                <p className="text-[0.9375rem] break-keep md:max-w-56 leading-normal text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
