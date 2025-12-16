"use client";

import Image from "next/image";
import { FadeDiv, FadeText } from "@/shared/ui/FadeMotion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Card } from "@/shared/ui";
import SkeletonBar from "./SkeletonBar";
import { useScrollOpacity } from "@/shared/lib/use-scroll-opacity";
import styles from "./Hero.module.css";

const CardStep1 = () => {
  return (
    <div className={styles.cardStep1}>
      <div className={styles.cardStep1Inner}>
        <div className={styles.checkIconContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
            className={styles.checkIcon}
          >
            <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
          </svg>
          <SkeletonBar width={2.5} height={1} />
          <SkeletonBar width={4} height={1} />
          <SkeletonBar width={1.5} height={1} />
        </div>
        <div className={styles.inputBox}>
          <div className={styles.inputLabel}>
            <SkeletonBar width={2.5} height={1} emphasize />
            <SkeletonBar width={1} height={1} emphasize />
            <SkeletonBar width={4} height={1} emphasize />
          </div>
          <div className={styles.cursor} />
        </div>
      </div>
    </div>
  );
};

export const CardStep2 = () => {
  return (
    <div className={styles.cardStep2}>
      <div className={styles.step2Header}>
        <SkeletonBar width={2} height={1} />
        <SkeletonBar width={3.5} height={1} />
      </div>
      <div className={styles.dropZone}>
        <div className={styles.dropZonePulse} />
        <Image
          src="/assets/svgs/xlsx.svg"
          alt="xlsx-icon"
          width={32}
          height={32}
          className={styles.xlsxIcon}
        />
        <div className={styles.xlsxShadow} />
        <Image
          src="/assets/svgs/cursor-hand.svg"
          alt="xlsx-icon"
          width={32}
          height={32}
          className={styles.cursorHand}
        />
      </div>
    </div>
  );
};

export const CardStep3 = () => {
  return (
    <div className={styles.cardStep3}>
      <div className={styles.cardStep3Inner}>
        <div className={styles.step3Header}>
          <SkeletonBar width={1.5} height={1} />
          <SkeletonBar width={2} height={1} />
        </div>
        <div className={styles.step3Content}>
          <div className={styles.step3InputBox}>
            <div className={styles.step3InputLabel}>
              <SkeletonBar width={1} height={1} emphasize />
              <SkeletonBar width={3.5} height={1} emphasize />
            </div>
            <Image
              src="/assets/svgs/ai-sparkles.svg"
              alt="cursor-icon"
              width={24}
              height={24}
              className={styles.aiSparkles}
            />
          </div>
          <div className={styles.pulseContainer}>
            <div className={styles.plusIconWrapper}>
              <Image
                src="/assets/svgs/plus-bold.svg"
                alt="cursor-icon"
                width={24}
                height={24}
                className={styles.plusIcon}
              />
            </div>
            <div className={styles.pulseOuter} />
            <div className={styles.pulseInner} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardStep4 = () => {
  return (
    <div className={styles.cardStep4}>
      <div className={styles.step4Tab}>
        <div className={styles.step4TabInner} />
      </div>
      <div className={styles.step4Card}>
        <div className={styles.step4SparklesRow}>
          <Image
            src="/assets/svgs/sparkles.svg"
            alt="sparkles-icon"
            width={32}
            height={32}
            className={styles.step4SparklesIcon}
          />
          <SkeletonBar width={5} height={1} emphasize />
          <SkeletonBar width={6} height={1} emphasize />
        </div>
        <div className={styles.step4TreeRow}>
          <div className={styles.step4TreeIconWrapper}>
            <Image
              src="/assets/svgs/tree-node.svg"
              alt="sparkles-icon"
              width={32}
              height={32}
              className={styles.step4TreeIcon}
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
    <div className={styles.cardStep5}>
      <table className={styles.step5Table}>
        <tbody>
          <tr>
            <td className={styles.step5CellSmall}></td>
            <td className={styles.step5ActiveCell}>
              <div className={styles.step5InputContainer}>
                <SkeletonBar width={4} height={1} />
                <SkeletonBar width={2} height={1} />
                <div className={styles.step5Dropdown}>
                  <div className={styles.step5DropdownRowHighlight}>
                    <div className={styles.step5NumberIcon}>
                      <Image
                        src="/assets/svgs/number-one-bold.svg"
                        alt="sparkles-icon"
                        width={32}
                        height={32}
                        className={styles.step5NumberImg}
                      />
                    </div>
                    <span className={styles.step5DropdownText}>연계복잡성</span>
                  </div>
                  <div className={styles.step5DropdownRow}>
                    <div className={styles.step5NumberIcon}>
                      <Image
                        src="/assets/svgs/number-two-bold.svg"
                        alt="sparkles-icon"
                        width={32}
                        height={32}
                        className={styles.step5NumberImg}
                      />
                    </div>
                    <span className={styles.step5DropdownText}>성능</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.step5CellSmall}></td>
            <td className={styles.step5CellLarge}></td>
          </tr>
          <tr>
            <td className={styles.step5CellSmall}></td>
            <td className={styles.step5CellLarge}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const CardStep6 = () => {
  return (
    <div className={styles.cardStep6}>
      <div className={styles.step6TableWrapper}>
        <table className={styles.step6Table}>
          <tbody>
            <tr>
              <td className={styles.step6CellWide} colSpan={2} />
              <td className={styles.step6CellNarrow} />
            </tr>
            <tr>
              <td className={styles.step6CellSmall}></td>
              <td className={styles.step6ActiveCell}>
                <div className={styles.cursor} />
                <span className={styles.step6Percent}>%</span>
              </td>
            </tr>
            <tr>
              <td className={styles.step6CellTertiary} colSpan={2} />
              <td className={styles.step6CellTertiary} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CardStep7 = () => {
  return (
    <div className={styles.cardStep7}>
      <div className={styles.step7ChartWrapper}>
        <div className={styles.chartRow}>
          <div className={styles.chartBarGreen} />
          <span className={styles.chartLabel}>ILF</span>
        </div>
        <div className={styles.chartRow}>
          <div className={styles.chartBarAmber} />
          <span className={styles.chartLabel}>ELF</span>
        </div>
        <div className={styles.chartRow}>
          <div className={styles.chartBarSky} />
          <span className={styles.chartLabel}>EI</span>
        </div>
        <div className={styles.chartRow}>
          <div className={styles.chartBarRed} />
          <span className={styles.chartLabel}>EO</span>
        </div>
      </div>
    </div>
  );
};

interface ProcessStep {
  id: number;
  number: string;
  key: string;
  title: string;
  content: React.ReactNode;
  image: string;
}

/**
 * 프로세스 단계 카드 데이터
 */
const processSteps: ProcessStep[] = [
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

const CARD_WIDTH = 256;
const CARD_GAP = 8;
const CONTAINER_PADDING = 48;
const ANIMATION_DELAY_MS = 1200;
const STEP_INTERVAL_MS = 4000;
const TOTAL_STEPS = 7;

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

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(() => {
      timeoutIdRef.current = setTimeout(() => {
        setIsAnimationStarted(true);
      }, ANIMATION_DELAY_MS);
    });

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAnimationStarted) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev >= TOTAL_STEPS ? 1 : prev + 1));
    }, STEP_INTERVAL_MS);

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

  const translateX = useMemo(() => {
    if (containerWidth === 0) return 0;

    const totalCards = processSteps.length;
    const carouselWidth = totalCards * CARD_WIDTH + (totalCards - 1) * CARD_GAP;
    const visibleWidth = containerWidth - CONTAINER_PADDING;
    const maxTranslate = Math.max(0, carouselWidth - visibleWidth);
    const cardLeftPosition = (currentStep - 1) * (CARD_WIDTH + CARD_GAP);

    let newTranslateX = cardLeftPosition;

    if (newTranslateX > maxTranslate) {
      newTranslateX = maxTranslate;
    }

    return Math.max(0, newTranslateX);
  }, [currentStep, containerWidth]);

  return (
    <main className={styles.heroMain}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <FadeText
            text="FINE PROJECT MATE"
            className={styles.subtitle}
            delay={500}
          />
          <div className={styles.mainTitle}>
            <div>
              <FadeText
                text="FPMate"
                className={styles.brandText}
                delay={700}
              />
              <FadeText text="로" delay={700} />
            </div>
            <FadeText
              text="SW 사업 비용 산정과 관리를 한 번에"
              delay={800}
              className={styles.breakKeep}
            />
          </div>
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>
              <FadeText
                text="FPMate"
                delay={900}
                className={styles.fontSemibold}
              />
              <FadeText text="는" delay={950} className={styles.marginRight} />
              <FadeText text="AI" delay={950} className={styles.fontSemibold} />
              <FadeText text="로" delay={950} className={styles.marginRight} />
              <FadeText
                text="쉽고 빠르게 SW 사업 비용을 알아 볼 수 있습니다. "
                delay={950}
                className={styles.marginRight}
              />
              <br />
              <FadeText
                text="표준화된 프로세스로 일관된 산정을 제공합니다."
                delay={1100}
              />
            </p>
            <p className={styles.subdescription}>
              <FadeText
                text="FPMate"
                delay={1200}
                className={styles.fontMedium}
              />
              <FadeText text="는" delay={1250} className={styles.marginRight} />
              <FadeText
                text="기능점수"
                delay={1300}
                className={styles.highlightText}
              />
              <FadeText
                text="기반의 소프트웨어 대가산정 "
                delay={1350}
                className={styles.marginRight}
              />
              <FadeText text="가이드를 준수합니다." delay={1350} />
            </p>
          </div>

          <FadeDiv className={styles.progressWrapper} delay={1200}>
            <div className={styles.progressContainer}>
              {processSteps.map((step, index) => (
                <Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={handleStepClick(step.id)}
                    className={
                      step.id === currentStep
                        ? styles.stepButtonActive
                        : step.id < currentStep
                        ? styles.stepButtonCompleted
                        : styles.stepButtonInactive
                    }
                  >
                    {step.id < currentStep ? (
                      <Image
                        src="/assets/svgs/check-bold.svg"
                        alt={`completed-step-${step.id}`}
                        width={32}
                        height={32}
                        className={`${styles.stepIcon} ${styles.stepIconInvert}`}
                      />
                    ) : (
                      <Image
                        src={`/assets/svgs/number-${step.key}-bold.svg`}
                        alt={`process-step-${step.id}`}
                        width={32}
                        height={32}
                        className={`${styles.stepIcon} ${
                          step.id === currentStep ? styles.stepIconInvert : ""
                        }`}
                      />
                    )}
                  </button>
                  {index < processSteps.length - 1 && (
                    <div className={styles.progressLine}>
                      {Boolean(isAnimationStarted) &&
                        step.id === currentStep && (
                          <div
                            key={`${currentStep}-${resetTrigger}`}
                            className={styles.progressFill}
                          />
                        )}
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </FadeDiv>
        </div>
      </div>

      <div className={styles.carouselSection}>
        <div ref={containerRef} className={styles.carouselContainer}>
          <div
            ref={carouselRef}
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${translateX}px)`,
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
                  className={
                    step.id === currentStep
                      ? styles.cardActive
                      : styles.cardInactive
                  }
                  onClick={handleStepClick(step.id)}
                >
                  <div className={styles.cardContentWrapper}>
                    {step.id !== currentStep && (
                      <div className={styles.cardOverlay} />
                    )}
                    {step.content}
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardNumber}>{step.number}</span>
                    <span className={styles.cardTitle}>{step.title}</span>
                  </div>
                </Card>
              </FadeDiv>
            ))}
          </div>
        </div>
      </div>

      <div
        className={styles.bottomGradient}
        style={
          {
            "--target-opacity": opacityGradation * 0.5,
            opacity: opacityGradation * 0.5,
          } as React.CSSProperties
        }
      />

      <div className={styles.centerGradient}>
        <Image
          src="/assets/images/backgroundBlur.webp"
          alt="background-blur"
          width={1952.78}
          height={1722}
          className={styles.centerGradientImage}
          style={{
            opacity: opacityGradation,
          }}
        />
      </div>
    </main>
  );
};

export default Hero;
