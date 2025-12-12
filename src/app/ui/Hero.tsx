"use client";

import Image from "next/image";
import { FadeDiv, FadeText } from "@/shared/ui/FadeMotion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Card } from "@/shared/ui";
import SkeletonBar from "./SkeletonBar";
import { useScrollOpacity } from "@/shared/lib/use-scroll-opacity";

const CardStep1 = () => {
  return (
    <div className="w-[256px] h-[130px] bg-gray-100 pl-10 overflow-hidden relative after:content-[''] after:absolute after:h-1/3 after:bottom-0 after:left-0 after:right-0 after:bg-linear-to-b after:from-transparent after:to-gray-200 after:pointer-events-none">
      <div className="bg-white w-full h-full border-l border-border-primary shadow-lg shadow-black/15 flex flex-col gap-2.5 pt-2.5 pl-6">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="size-7 mr-1 text-brand-primary"
          >
            <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
          </svg>
          <SkeletonBar width={2.5} height={1} />
          <SkeletonBar width={4} height={1} />
          <SkeletonBar width={1.5} height={1} />
        </div>
        <div className="rounded-md border-2 border-border-secondary h-14 w-lg relative flex items-center pl-3.5">
          <div className="absolute left-4 -top-2 flex items-center gap-1 px-1 bg-white">
            <SkeletonBar width={2.5} height={1} emphasize />
            <SkeletonBar width={1} height={1} emphasize />
            <SkeletonBar width={4} height={1} emphasize />
          </div>
          <div className="h-6.5 w-0.5 bg-zinc-800 animate-cursor-blink" />
        </div>
      </div>
    </div>
  );
};

export const CardStep2 = () => {
  return (
    <div className="w-[256px] h-[130px] bg-white pl-10 overflow-hidden relative after:content-[''] after:absolute after:h-1/3 after:bottom-0 after:left-0 after:right-0 after:bg-linear-to-b after:from-transparent after:to-gray-200 after:pointer-events-none pt-3">
      <div className="flex items-center gap-1 mb-2">
        <SkeletonBar width={2} height={1} />
        <SkeletonBar width={3.5} height={1} />
      </div>
      <div className="bg-white w-full h-40 border-l-4 border-t-4 border-dashed border-amber-300 rounded-tl-xl flex flex-col gap-2.5 pl-6 relative">
        <div className="bg-amber-100 absolute top-0 left-0 w-full h-full animate-pulse" />
        <Image
          src="/assets/svgs/xlsx.svg"
          alt="xlsx-icon"
          width={32}
          height={32}
          className="size-16 absolute -top-6 left-14 shrink-0 z-10"
        />
        <div className="absolute -top-1 left-18 w-10.5 h-10 bg-black shadow-lg shadow-black/15" />
        <Image
          src="/assets/svgs/cursor-hand.svg"
          alt="xlsx-icon"
          width={32}
          height={32}
          className="size-14 absolute top-5 left-26 shrink-0 z-20"
        />
      </div>
    </div>
  );
};

export const CardStep3 = () => {
  return (
    <div className="w-[256px] h-[130px] overflow-hidden relative after:content-[''] after:absolute after:h-1/3 after:bottom-0 after:left-0 after:right-0 after:bg-linear-to-b after:from-transparent after:to-gray-200 after:pointer-events-none">
      <div className="bg-white w-full h-full flex flex-col gap-3 justify-center after:content-[''] relative after:absolute after:w-20 after:h-full after:left-0 after:top-0 after:bg-linear-to-r after:from-white after:to-transparent after:pointer-events-none">
        <div className="flex items-center gap-1">
          <SkeletonBar width={1.5} height={1} />
          <SkeletonBar width={2} height={1} />
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-r-md border-t-2 border-r-2 border-b-2 border-border-secondary h-14 w-40 relative flex items-center pl-3.5">
            <div className="absolute left-0 -top-2 flex items-center gap-1 pr-1 bg-white">
              <SkeletonBar width={1} height={1} emphasize />
              <SkeletonBar width={3.5} height={1} emphasize />
            </div>
            <Image
              src="/assets/svgs/ai-sparkles.svg"
              alt="cursor-icon"
              width={24}
              height={24}
              className="size-10 absolute right-3 bottom-1"
            />
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="flex items-center justify-center size-12 shrink-0 z-10">
              <Image
                src="/assets/svgs/plus-bold.svg"
                alt="cursor-icon"
                width={24}
                height={24}
                className="size-6 absolute"
              />
            </div>

            {/* pulse animation */}
            <div className="absolute right-0 bottom-0 bg-gray-200 rounded-full flex items-center justify-center size-12 shrink-0  animate-pulse" />
            <div className="absolute right-1 bottom-1 bg-gray-200 rounded-full flex items-center justify-center size-10 shrink-0  animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardStep4 = () => {
  return (
    <div className="w-[256px] h-[130px] overflow-hidden relative after:content-[''] after:absolute after:h-1/3 after:bottom-0 after:left-0 after:right-0 after:bg-linear-to-b after:from-transparent after:to-gray-200 after:pointer-events-none pl-10 flex flex-col gap-1">
      <div className="shrink-0 h-3 overflow-hidden relative">
        <div className="absolute bottom-0 flex items-center gap-4 bg-[#5F933A] h-6 w-32 rounded-l rounded-full shrink-0" />
      </div>
      <div className="bg-white w-full border-l border-t rounded-tl-lg overflow-hidden border-border-tertiary shadow-lg shadow-black/20 flex flex-col justify-center shrink-0">
        {/* sparkles */}
        <div className="flex items-center gap-1 p-2 pl-4 bg-slate-100">
          <Image
            src="/assets/svgs/sparkles.svg"
            alt="sparkles-icon"
            width={32}
            height={32}
            className="size-10 shrink-0 mr-2"
          />
          <SkeletonBar width={5} height={1} emphasize />
          <SkeletonBar width={6} height={1} emphasize />
        </div>

        {/* tree nodes */}
        <div className="flex items-center gap-1 p-2 pl-4">
          <div className="size-10 shrink-0 flex items-center justify-center mr-2">
            <Image
              src="/assets/svgs/tree-node.svg"
              alt="sparkles-icon"
              width={32}
              height={32}
              className="size-8 shrink-0"
            />
          </div>
          <SkeletonBar width={2.5} height={1} />
          <SkeletonBar width={6} height={1} />
        </div>
      </div>
    </div>
  );
};

export const CardStep5 = () => {
  return (
    <div className="w-[256px] h-[130px] overflow-hidden relative after:content-[''] after:absolute after:h-1/3 after:bottom-0 after:left-0 after:right-0 after:bg-linear-to-b after:from-transparent after:to-gray-200 after:pointer-events-none">
      <table className="absolute -top-5 -left-1 min-w-lg">
        <tbody>
          <tr>
            <td className="border border-border-primary h-14 w-16"></td>
            <td className="border border-border-primary h-14 w-lg pl-3 pb-3 bg-gray-100">
              <div className="border border-brand-primary h-full rounded outline-4 outline-brand-primary/30 pl-3 flex items-center gap-1 bg-white relative">
                <SkeletonBar width={4} height={1} />
                <SkeletonBar width={2} height={1} />

                {/* select box */}
                <div className="bg-white w-full border-l border-t rounded-lg overflow-hidden border-border-tertiary shadow-lg shadow-black/20 flex flex-col justify-center shrink-0 absolute top-12.5 -left-0.5">
                  {/* sparkles */}
                  <div className="flex items-center gap-1 p-2 pl-4 bg-slate-100">
                    <div className="size-10 shrink-0 flex items-center justify-center">
                      <Image
                        src="/assets/svgs/number-one-bold.svg"
                        alt="sparkles-icon"
                        width={32}
                        height={32}
                        className="size-6.5 shrink-0"
                      />
                    </div>
                    <span className="text-xl font-medium text-text-secondary">
                      연계복잡성
                    </span>
                  </div>

                  {/* tree nodes */}
                  <div className="flex items-center gap-1 p-2 pl-4">
                    <div className="size-10 shrink-0 flex items-center justify-center">
                      <Image
                        src="/assets/svgs/number-two-bold.svg"
                        alt="sparkles-icon"
                        width={32}
                        height={32}
                        className="size-6.5 shrink-0"
                      />
                    </div>
                    <span className="text-xl font-medium text-text-secondary">
                      성능
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-border-primary h-14 w-16"></td>
            <td className="border border-border-primary h-14 w-lg"></td>
          </tr>
          <tr>
            <td className="border border-border-primary h-14 w-16"></td>
            <td className="border border-border-primary h-14 w-lg"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const CardStep6 = () => {
  return (
    <div className="w-[256px] h-[130px] overflow-hidden relative after:content-[''] after:absolute after:h-1/3 after:bottom-0 after:left-0 after:right-0 after:bg-linear-to-b after:from-transparent after:to-gray-200 after:pointer-events-none">
      <div className="absolute -top-5 -left-1 w-72">
        <table className="relative w-full h-full after:content-[''] after:absolute after:h-full after:w-20 after:bottom-0 after:left-0 after:bg-linear-to-r after:from-white after:to-transparent after:pointer-events-none">
          <tbody>
            <tr>
              <td
                className="border border-border-secondary h-14 w-36"
                colSpan={2}
              />
              <td className="border border-border-secondary h-14 w-20" />
            </tr>
            <tr>
              <td className="border border-border-secondary h-14 w-12"></td>
              <td className="border border-accent-primary h-14 w-40 bg-amber-100 p-3 text-end flex items-center justify-end gap-2">
                <div className="h-6.5 w-0.5 bg-zinc-800 animate-cursor-blink" />
                <span className="text-2xl font-medium mb-1">%</span>
              </td>
            </tr>
            <tr>
              <td
                className="border border-border-tertiary h-14 w-36"
                colSpan={2}
              />
              <td className="border border-border-tertiary h-14 w-20" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CardStep7 = () => {
  return (
    <div className="w-[256px] h-[130px] overflow-hidden relative after:content-[''] after:absolute after:h-1/3 after:bottom-0 after:left-0 after:right-0 after:bg-linear-to-b after:from-transparent after:to-gray-200 after:pointer-events-none">
      <div className="flex flex-col gap-0.5 pt-3 relative after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:bg-linear-to-r after:w-24 after:from-white/80 after:to-transparent after:pointer-events-none">
        {/* green - ILF */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-12 rounded-r-sm shadow shadow-black/20 bg-linear-to-r from-green-300 to-green-400" />
          <span className="text-sm font-semibold tracking-tight">ILF</span>
        </div>

        {/* amber - ELF */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-36 rounded-r-sm shadow shadow-black/20 bg-linear-to-r from-amber-300 to-amber-400" />
          <span className="text-sm font-semibold tracking-tight">ELF</span>
        </div>

        {/* sky - EI */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-20 rounded-r-sm shadow shadow-black/20 bg-linear-to-r from-sky-300 to-sky-400" />
          <span className="text-sm font-semibold tracking-tight">EI</span>
        </div>

        {/* red - EO */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-48 rounded-r-sm shadow shadow-black/20 bg-linear-to-r from-red-300 to-red-400" />
          <span className="text-sm font-semibold tracking-tight">EO</span>
        </div>
      </div>
    </div>
  );
};

/**
 * 프로세스 단계 카드 데이터
 */
const processSteps = [
  {
    id: 1,
    number: "01",
    key: "one",
    title: "비용 산정 관련 정보 등록",
    content: <CardStep1 />,
    image: "/assets/images/main-card-01.png",
  },
  {
    id: 2,
    number: "02",
    key: "two",
    title: "비용 산정 시작",
    content: <CardStep2 />,
    image: "/assets/images/main-card-02.png",
  },
  {
    id: 3,
    number: "03",
    key: "three",
    title: "개발 범위 식별",
    content: <CardStep3 />,
    image: "/assets/images/main-card-03.png",
  },
  {
    id: 4,
    number: "04",
    key: "four",
    title: "기능 규모 산정",
    content: <CardStep4 />,
    image: "/assets/images/main-card-04.png",
  },
  {
    id: 5,
    number: "05",
    key: "five",
    title: "보정 계수 결정",
    content: <CardStep5 />,
    image: "/assets/images/main-card-05.png",
  },
  {
    id: 6,
    number: "06",
    key: "six",
    title: "SW 사업 비용 산정",
    content: <CardStep6 />,
    image: "/assets/images/main-card-06.png",
  },
  {
    id: 7,
    number: "07",
    key: "seven",
    title: "리포팅",
    content: <CardStep7 />,
    image: "/assets/images/main-card-07.png",
  },
];

const Hero = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isAnimationStarted, setIsAnimationStarted] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rafIdRef = useRef<number>(0);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const opacityGradation = useScrollOpacity({
    startOffset: 0,
    endOffset: 500,
    minOpacity: 0,
    maxOpacity: 1,
  });

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
    rafIdRef.current = requestAnimationFrame(() => {
      timeoutIdRef.current = setTimeout(() => {
        setIsAnimationStarted(true);
      }, 1200);
    });

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
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
    <main className="relative pb-24 md:pb-40 overflow-hidden">
      {/* text & progress bar container */}
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Title */}
        <div className="py-10 space-y-6 flex flex-col relative z-20">
          <FadeText
            text="FINE PROJECT MATE"
            className="text-[0.9375rem] md:text-[1.0625rem] tracking-tight font-semibold text-text-tertiary"
            delay={500}
          />
          <div className="text-[2.5rem] md:text-[3.75rem] leading-[1.15] tracking-tighter font-bold">
            <div>
              <FadeText
                text="FPMate"
                className="font-extrabold text-brand-primary"
                delay={700}
              />
              <FadeText text="로" delay={700} />
            </div>
            <FadeText
              text="SW 사업 비용 산정과 관리를 한 번에"
              delay={800}
              className="break-keep"
            />
          </div>
          <div className="space-y-3">
            <p className="text-[1.0625rem] md:text-[1.3125rem] leading-normal tracking-tight break-keep">
              <FadeText text="FPMate" delay={900} className="font-semibold" />
              <FadeText
                text="는"
                //   text="는 AI 비서와 함께"
                delay={950}
                className="
            mr-1"
              />
              <FadeText
                text="AI"
                //   text="는 AI 비서와 함께"
                delay={950}
                className="font-semibold"
              />
              <FadeText
                text="로"
                //   text="는 AI 비서와 함께"
                delay={950}
                className="mr-1"
              />
              <FadeText
                text="쉽고 빠르게 SW 사업 비용을 알아 볼 수 있습니다. "
                //   text="는 AI 비서와 함께"
                delay={950}
                className="mr-1"
              />
              <br />
              <FadeText
                text="표준화된 프로세스로 일관된 산정을 제공합니다."
                delay={1100}
              />
            </p>
            <p className="text-[0.9375rem] sm:text-base text-text-secondary">
              <FadeText text="FPMate" delay={1200} className="font-medium" />
              <FadeText text="는" delay={1250} className="mr-1" />
              <FadeText
                text="기능점수"
                delay={1300}
                className="font-semibold text-text-primary mr-1"
              />
              <FadeText
                text="기반의 소프트웨어 대가산정 "
                delay={1350}
                className="mr-1"
              />
              <FadeText text="가이드를 준수합니다." delay={1350} />
            </p>
          </div>
        </div>

        {/* progress bar */}
        <FadeDiv className="w-full" delay={1200}>
          <div className="flex items-center w-full max-w-xs sm:max-w-lg pb-4 md:py-4 lg:py-8">
            {processSteps.map((step, index) => (
              <Fragment key={step.id}>
                <button
                  type="button"
                  onClick={handleStepClick(step.id)}
                  className={`size-8 sm:size-9 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                    step.id === currentStep
                      ? "bg-brand-primary"
                      : step.id < currentStep
                      ? "bg-accent-primary"
                      : "bg-white border border-border-primary"
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
                    {Boolean(isAnimationStarted) && step.id === currentStep && (
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
        </FadeDiv>
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
              <FadeDiv key={step.id} delay={1800 + index * 150}>
                <Card
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  variant="elevated"
                  padding="none"
                  className={`w-64 shrink-0 transition-[outline] duration-500 ease-out cursor-pointer overflow-hidden group ${
                    step.id === currentStep
                      ? "outline-4 outline-black" // ring-brand-primary
                      : "outline-1 outline-gray-300 hover:outline-accent-hover"
                  }`}
                  onClick={handleStepClick(step.id)}
                >
                  <div className="relative">
                    <div
                      className={
                        step.id === currentStep
                          ? "bg-transparent"
                          : "absolute top-0 left-0 z-20 w-full h-full bg-white/20"
                      }
                    />
                    {step.content}
                  </div>
                  <div className="flex flex-col px-4 py-6">
                    <span className="text-[27px] text-brand-primary font-base">
                      {step.number}
                    </span>
                    <span className="text-lg font-semibold tracking-tight">
                      {step.title}
                    </span>
                  </div>
                </Card>
              </FadeDiv>
            ))}
          </div>
        </div>
      </div>

      {/* bottom background gradient */}
      <div
        className="absolute -bottom-8 left-0 right-0 w-full bg-linear-to-t from-[#00AB55] via-to-[#80D5AA] to-transparent h-32 -z-10 opacity-50 transition-opacity duration-500 ease-in animate-fade-in-gradient"
        style={
          {
            "--target-opacity": opacityGradation * 0.5,
            opacity: opacityGradation * 0.5,
          } as React.CSSProperties
        }
      />

      {/* bottom center background gradient */}
      <div className="absolute left-[50%] -top-12 md:top-24 w-[1952.78px] pointer-events-none select-none -z-20 scale-90 transition-opacity duration-500 ease-in -translate-x-1/2 animate-fade-in-gradient">
        <Image
          src="/assets/images/backgroundBlur.webp"
          alt="background-blur"
          width={1952.78}
          height={1722}
          className="scale-60 md:scale-100"
          style={{
            opacity: opacityGradation,
          }}
        />
      </div>
    </main>
  );
};

export default Hero;
