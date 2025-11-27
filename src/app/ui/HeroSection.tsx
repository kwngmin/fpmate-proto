"use client";

import Image from "next/image";
import { BlurFadeDiv, BlurFadeText } from "@/shared/ui/BlurFadeText";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Card } from "@/shared/ui";

/**
 * 프로세스 단계 카드 데이터
 */
const processSteps = [
  {
    id: 1,
    number: "01",
    key: "one",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-01.png",
  },
  {
    id: 2,
    number: "02",
    key: "two",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-02.png",
  },
  {
    id: 3,
    number: "03",
    key: "three",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-03.png",
  },
  {
    id: 4,
    number: "04",
    key: "four",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-04.png",
  },
  {
    id: 5,
    number: "05",
    key: "five",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-05.png",
  },
  {
    id: 6,
    number: "06",
    key: "six",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-06.png",
  },
  {
    id: 7,
    number: "07",
    key: "seven",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-07.png",
  },
];

const HeroSection = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isAnimationStarted, setIsAnimationStarted] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 카드 너비와 갭 상수
  const CARD_WIDTH = 256; // w-64
  const CARD_GAP = 8; // gap-2

  // 컨테이너 너비 측정 (resize 이벤트 구독)
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  // 프로그레스 자동 진행 (BlurFade delay 후 시작)
  useEffect(() => {
    // 1200ms 후에 애니메이션 시작
    const initialDelay = setTimeout(() => {
      setIsAnimationStarted(true);
    }, 1200);

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  // interval은 애니메이션이 시작된 후에만 실행
  useEffect(() => {
    if (!isAnimationStarted) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 7) return 1;
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimationStarted, resetTrigger]);

  const handleStepClick = useCallback(
    (stepId: number) => () => {
      if (stepId !== currentStep) {
        setCurrentStep(stepId);
      }
      setResetTrigger((prev) => prev + 1);
    },
    [currentStep]
  );

  // translateX 계산
  const translateX = useMemo(() => {
    if (containerWidth === 0) return 0;

    const totalCards = processSteps.length;
    const carouselWidth = totalCards * CARD_WIDTH + (totalCards - 1) * CARD_GAP;

    // clientWidth는 padding을 포함하므로, 실제 보이는 영역은 padding 제외
    const PADDING = 48; // px-6 = 24px * 2
    const visibleWidth = containerWidth - PADDING;
    const maxTranslate = Math.max(0, carouselWidth - visibleWidth);

    // 현재 카드의 왼쪽 위치
    const cardLeftPosition = (currentStep - 1) * (CARD_WIDTH + CARD_GAP);

    // 기본: 카드 왼쪽을 main 왼쪽에 맞춤
    let newTranslateX = cardLeftPosition;

    // 오른쪽 끝 처리: 더 이상 왼쪽으로 이동할 수 없으면 오른쪽에 맞춤
    if (newTranslateX > maxTranslate) {
      newTranslateX = maxTranslate;
    }

    // 음수 방지 (첫 번째 카드)
    return Math.max(0, newTranslateX);
  }, [currentStep, containerWidth]);

  return (
    <main className="pb-20 md:pb-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Title */}
        <div className="py-10 space-y-6 flex flex-col">
          <BlurFadeText
            text="FINE PROJECT MATE"
            className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold"
            delay={500}
          />
          <div className="text-[2.5rem] md:text-[3.75rem] leading-[1.1] tracking-[-0.022em] font-bold">
            <div>
              <BlurFadeText
                text="FPMate"
                className="font-bold text-brand-primary"
                delay={700}
              />
              <BlurFadeText text="로" delay={700} />
            </div>
            <BlurFadeText
              text="SW 사업 비용 산정과 관리를 한번에"
              delay={800}
              className="break-keep"
            />
          </div>
          <p className="text-[1.0625rem] md:text-[1.3125rem] leading-snug tracking-tight break-keep">
            <BlurFadeText
              text="FPMate"
              delay={900}
              className="font-semibold text-accent-primary"
            />
            <BlurFadeText
              text="는"
              //   text="는 AI 비서와 함께"
              delay={950}
              className="
            mr-1"
            />
            <BlurFadeText
              text="AI 비서"
              //   text="는 AI 비서와 함께"
              delay={950}
              className="font-semibold"
            />
            <BlurFadeText
              text="와"
              //   text="는 AI 비서와 함께"
              delay={950}
              className="mr-1"
            />
            <BlurFadeText
              text="쉽고 빠르게 SW 사업 비용을 알아 볼 수 있습니다. "
              //   text="는 AI 비서와 함께"
              delay={950}
              className="mr-1"
            />
            {/* <br className="md:hidden" /> */}
            {/* <BlurFadeText text="" delay={1000} /> */}
            <br />
            <BlurFadeText
              text="사업 단계별 변경 관리도 어렵지 않아요."
              delay={1100}
            />
          </p>
        </div>

        {/* Action Buttons - Mobile*/}
        {/* <div className="flex items-center gap-2 md:hidden">
        <Button variant="primary" size="md">
          제품도입문의
        </Button>
        <Button variant="ghost" size="md">
          로그인/회원가입
        </Button>
      </div> */}

        {/* Action Buttons - Desktop*/}
        {/* <div className="hidden md:flex items-center gap-2">
        <Button variant="primary" size="lg">
          제품도입문의
        </Button>
        <Button variant="ghost" size="lg">
          로그인/회원가입
        </Button>
      </div> */}

        {/* progress bar */}
        <BlurFadeDiv className="w-full" delay={1200}>
          <div className="flex items-center w-full max-w-xs sm:max-w-lg md:max-w-xl pb-6 md:pt-6">
            {processSteps.map((step, index) => (
              <Fragment key={step.id}>
                <button
                  type="button"
                  onClick={handleStepClick(step.id)}
                  className={`size-8 sm:size-9 md:size-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    step.id === currentStep
                      ? "bg-brand-primary"
                      : step.id < currentStep
                      ? "bg-accent-primary"
                      : "bg-bg-tertiary"
                  }`}
                >
                  {step.id < currentStep ? (
                    <Image
                      src="/assets/svgs/check-bold.svg"
                      alt={`completed-step-${step.id}`}
                      width={32}
                      height={32}
                      className="size-4.5 md:size-5 brightness-0 invert"
                    />
                  ) : (
                    <Image
                      src={`/assets/svgs/number-${step.key}-bold.svg`}
                      alt={`process-step-${step.id}`}
                      width={32}
                      height={32}
                      className={`size-4.5 md:size-5 ${
                        step.id === currentStep ? "brightness-0 invert" : ""
                      }`}
                    />
                  )}
                </button>
                {index < processSteps.length - 1 && (
                  <div className="grow h-1 sm:h-0.75 bg-border-primary relative overflow-hidden">
                    {isAnimationStarted && step.id === currentStep && (
                      <div
                        key={`${currentStep}-${resetTrigger}`}
                        className="absolute inset-0 bg-brand-primary origin-left will-change-transform"
                        style={{
                          animation: "progressBar 4s forwards",
                        }}
                      />
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <style jsx>{`
            @keyframes progressBar {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
          `}</style>
        </BlurFadeDiv>
      </div>

      {/* 카드 영역 - Linear.app 스타일 Inset 캐로셀 */}

      <div className='className="w-full py-4 overflow-hidden'>
        {/* 1200px 컨테이너 - main과 동일한 정렬 */}
        <div
          ref={containerRef}
          className="max-w-[1200px] mx-auto px-6 overflow-visible"
        >
          {/* 캐로셀 트랙 */}
          <div
            ref={carouselRef}
            className="flex gap-2 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${translateX}px)`,
              width: "max-content",
            }}
          >
            {processSteps.map((step, index) => (
              <BlurFadeDiv key={step.id} delay={1700 + index * 100}>
                <Card
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  variant="elevated"
                  padding="none"
                  className={`w-64 shrink-0 transition-all duration-500 ease-out cursor-pointer border overflow-hidden ${
                    step.id === currentStep
                      ? "scale-100 opacity-100 ring-4 ring-brand-primary border-transparent"
                      : "scale-[0.98] opacity-70 hover:opacity-90 border-border-primary hover:border-border-secondary"
                  }`}
                  onClick={handleStepClick(step.id)}
                >
                  <Image
                    src={step.image}
                    alt={`step-${step.number}`}
                    width={256}
                    height={152}
                    className="w-[256px] h-[130px] object-cover"
                  />
                  <div className="flex flex-col px-4 py-6">
                    <span className="text-[27px] text-brand-primary font-base">
                      {step.number}
                    </span>
                    <span className="text-lg font-semibold tracking-tight">
                      {step.title}
                    </span>
                  </div>
                </Card>
              </BlurFadeDiv>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
