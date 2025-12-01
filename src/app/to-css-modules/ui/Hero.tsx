"use client";

import Image from "next/image";
import { BlurFadeDiv, BlurFadeText } from "@/shared/ui/BlurFadeText";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Card } from "./Card";
import SkeletonBar from "./SkeletonBar";
import styles from "./Hero.module.css";

/**
 * CardStep1 - SW 사업 정보 등록 카드
 */
const CardStep1 = () => {
  return (
    <div className={`${styles.cardStepBase} ${styles.step1Container}`}>
      <div className={styles.step1Inner}>
        <div className={styles.step1Row}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
            className={styles.step1Check}
          >
            <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
          </svg>
          <SkeletonBar width={2.5} height={1} />
          <SkeletonBar width={4} height={1} />
          <SkeletonBar width={1.5} height={1} />
        </div>
        <div className={styles.step1Input}>
          <div className={styles.step1Label}>
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

/**
 * CardStep2 - SW 비용 산정 정보 등록 카드
 */
const CardStep2 = () => {
  return (
    <div className={`${styles.cardStepBase} ${styles.step2Container}`}>
      <div className={styles.step2Inner}>
        {/* check */}
        <div className={styles.step2Row}>
          <div className={`${styles.checkBox} ${styles.checkBoxFilled}`}>
            <Image
              src="/assets/svgs/check-bold.svg"
              alt="check-icon"
              width={32}
              height={32}
              className={styles.checkIcon}
            />
          </div>
          <Image
            src="/assets/svgs/xlsx.svg"
            alt="xlsx-icon"
            width={32}
            height={32}
            className={styles.fileIcon}
          />
          <SkeletonBar width={2.5} height={1} />
          <SkeletonBar width={6} height={1} />
        </div>
        {/* sparkles */}
        <div className={styles.step2Row}>
          <div className={`${styles.checkBox} ${styles.checkBoxOutline}`}>
            <Image
              src="/assets/svgs/check-bold.svg"
              alt="check-icon"
              width={32}
              height={32}
              className={styles.checkIcon}
            />
          </div>
          <Image
            src="/assets/svgs/sparkles.svg"
            alt="sparkles-icon"
            width={32}
            height={32}
            className={styles.fileIcon}
          />
          <SkeletonBar width={5} height={1} />
          <SkeletonBar width={6} height={1} />
        </div>
      </div>
    </div>
  );
};

/**
 * CardStep3 - 개발 범위 식별 카드
 */
const CardStep3 = () => {
  return (
    <div className={styles.cardStepBase}>
      <div className={styles.step3Inner}>
        <div className={styles.step3Row}>
          <SkeletonBar width={1.5} height={1} />
          <SkeletonBar width={2} height={1} />
        </div>
        <div className={styles.step3InputRow}>
          <div className={styles.step3Input}>
            <div className={styles.step3Label}>
              <SkeletonBar width={1} height={1} emphasize />
              <SkeletonBar width={3.5} height={1} emphasize />
            </div>
          </div>
          <div className={styles.step3ButtonGroup}>
            <div className={styles.step3Button}>
              <Image
                src="/assets/svgs/plus-bold.svg"
                alt="cursor-icon"
                width={24}
                height={24}
                className={styles.step3Icon}
              />
            </div>

            {/* pulse animation */}
            <div className={styles.step3Pulse} />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CardStep4 - 기능 규모 산정 카드
 */
const CardStep4 = () => {
  return (
    <div className={`${styles.cardStepBase} ${styles.step4Container}`}>
      <div className={styles.step4TabWrapper}>
        <div className={styles.step4Tab} />
      </div>
      <div className={styles.step4Inner}>
        {/* sparkles */}
        <div className={`${styles.step4Row} ${styles.step4RowHighlight}`}>
          <Image
            src="/assets/svgs/sparkles.svg"
            alt="sparkles-icon"
            width={32}
            height={32}
            className={`${styles.step4Icon} ${styles.step4IconWrapper}`}
          />
          <SkeletonBar width={5} height={1} emphasize />
          <SkeletonBar width={6} height={1} emphasize />
        </div>

        {/* tree nodes */}
        <div className={styles.step4Row}>
          <div className={styles.step4IconWrapper}>
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

/**
 * CardStep5 - 보정계수 결정 카드
 */
const CardStep5 = () => {
  return (
    <div className={styles.cardStepBase}>
      <table className={styles.step5Table}>
        <tbody>
          <tr>
            <td className={`${styles.step5Cell} ${styles.step5CellSmall}`} />
            <td className={`${styles.step5Cell} ${styles.step5CellLarge}`}>
              <div className={styles.step5Input}>
                <SkeletonBar width={4} height={1} />
                <SkeletonBar width={2} height={1} />

                {/* select box */}
                <div className={styles.step5Dropdown}>
                  {/* sparkles */}
                  <div
                    className={`${styles.step5DropdownRow} ${styles.step5DropdownHighlight}`}
                  >
                    <div className={styles.step4IconWrapper}>
                      <Image
                        src="/assets/svgs/number-one-bold.svg"
                        alt="sparkles-icon"
                        width={32}
                        height={32}
                        className={styles.step5NumberIcon}
                      />
                    </div>
                    <SkeletonBar width={5} height={1} emphasize />
                    <SkeletonBar width={6} height={1} emphasize />
                  </div>

                  {/* tree nodes */}
                  <div className={styles.step5DropdownRow}>
                    <div className={styles.step4IconWrapper}>
                      <Image
                        src="/assets/svgs/number-two-bold.svg"
                        alt="sparkles-icon"
                        width={32}
                        height={32}
                        className={styles.step5NumberIcon}
                      />
                    </div>
                    <SkeletonBar width={2.5} height={1} />
                    <SkeletonBar width={6} height={1} />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={`${styles.step5Cell} ${styles.step5CellSmall}`} />
            <td className={`${styles.step5Cell} ${styles.step5CellLarge}`} />
          </tr>
          <tr>
            <td className={`${styles.step5Cell} ${styles.step5CellSmall}`} />
            <td className={`${styles.step5Cell} ${styles.step5CellLarge}`} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/**
 * CardStep6 - SW 사업비용 산정 카드
 */
const CardStep6 = () => {
  return (
    <div className={styles.cardStepBase}>
      <div className={styles.step6Wrapper}>
        <table className={styles.step6Table}>
          <tbody>
            <tr>
              <td
                className={`${styles.step6Cell} ${styles.step6CellMedium}`}
                colSpan={2}
              />
              <td className={`${styles.step6Cell} ${styles.step6CellLarge}`} />
            </tr>
            <tr>
              <td className={`${styles.step6Cell} ${styles.step6CellSmall}`} />
              <td className={styles.step6CellHighlight}>
                <div className={styles.cursor} />
                <span className={styles.step6Percent}>%</span>
              </td>
            </tr>
            <tr>
              <td
                className={`${styles.step6Cell} ${styles.step6CellMedium}`}
                colSpan={2}
              />
              <td className={`${styles.step6Cell} ${styles.step6CellLarge}`} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * CardStep7 - 리포팅 카드
 */
const CardStep7 = () => {
  return (
    <div className={styles.cardStepBase}>
      <div className={styles.step7Inner}>
        {/* green - ILF */}
        <div className={styles.step7Row}>
          <div className={`${styles.step7Bar} ${styles.step7BarGreen}`} />
          <span className={styles.step7Label}>ILF</span>
        </div>

        {/* amber - ELF */}
        <div className={styles.step7Row}>
          <div className={`${styles.step7Bar} ${styles.step7BarAmber}`} />
          <span className={styles.step7Label}>ELF</span>
        </div>

        {/* sky - EI */}
        <div className={styles.step7Row}>
          <div className={`${styles.step7Bar} ${styles.step7BarSky}`} />
          <span className={styles.step7Label}>EI</span>
        </div>

        {/* red - EO */}
        <div className={styles.step7Row}>
          <div className={`${styles.step7Bar} ${styles.step7BarRed}`} />
          <span className={styles.step7Label}>EO</span>
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
    title: "SW 사업 정보 정보 등록",
    content: <CardStep1 />,
    image: "/assets/images/main-card-01.png",
  },
  {
    id: 2,
    number: "02",
    key: "two",
    title: "SW 비용 산정 정보 등록",
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
    title: "보정계수 결정",
    content: <CardStep5 />,
    image: "/assets/images/main-card-05.png",
  },
  {
    id: 6,
    number: "06",
    key: "six",
    title: "SW 사업비용 산정",
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

/**
 * Hero 컴포넌트 - CSS Modules 버전
 */
const Hero = () => {
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
    <main className={styles.main}>
      {/* text & progress bar container */}
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleSection}>
          <BlurFadeText
            text="FINE PROJECT MATE"
            className={styles.subtitle}
            delay={500}
          />
          <div className={styles.titleWrapper}>
            <div>
              <BlurFadeText
                text="FPMate"
                className={styles.brandText}
                delay={700}
              />
              <BlurFadeText text="로" delay={700} />
            </div>
            <BlurFadeText
              text="SW 사업 비용 산정과 관리를 한번에"
              delay={800}
              className={styles.breakKeep}
            />
          </div>
          <p className={styles.description}>
            <BlurFadeText
              text="FPMate"
              delay={900}
              className={styles.fontSemibold}
            />
            <BlurFadeText text="는" delay={950} className={styles.mr1} />
            <BlurFadeText
              text="AI 비서"
              delay={950}
              className={styles.fontSemibold}
            />
            <BlurFadeText text="와" delay={950} className={styles.mr1} />
            <BlurFadeText
              text="쉽고 빠르게 SW 사업 비용을 알아 볼 수 있습니다. "
              delay={950}
              className={styles.mr1}
            />
            <br />
            <BlurFadeText
              text="사업 단계별 변경 관리도 어렵지 않아요."
              delay={1100}
            />
          </p>
        </div>

        {/* progress bar */}
        <BlurFadeDiv className={styles.progressContainer} delay={1200}>
          <div className={styles.progressBar}>
            {processSteps.map((step, index) => (
              <Fragment key={step.id}>
                <button
                  type="button"
                  onClick={handleStepClick(step.id)}
                  className={`${styles.progressStep} ${
                    step.id === currentStep
                      ? styles.current
                      : step.id < currentStep
                      ? styles.completed
                      : styles.pending
                  }`}
                >
                  {step.id < currentStep ? (
                    <Image
                      src="/assets/svgs/check-bold.svg"
                      alt={`completed-step-${step.id}`}
                      width={32}
                      height={32}
                      className={styles.progressCheckIcon}
                    />
                  ) : (
                    <Image
                      src={`/assets/svgs/number-${step.key}-bold.svg`}
                      alt={`process-step-${step.id}`}
                      width={32}
                      height={32}
                      className={
                        step.id === currentStep
                          ? styles.progressNumberIconActive
                          : styles.progressNumberIcon
                      }
                    />
                  )}
                </button>
                {index < processSteps.length - 1 && (
                  <div className={styles.progressLine}>
                    {isAnimationStarted && step.id === currentStep && (
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
        </BlurFadeDiv>
      </div>

      {/* 카드 영역 - Linear.app 스타일 Inset 캐로셀 */}
      <div className={styles.carouselWrapper}>
        {/* 1200px 컨테이너 - main과 동일한 정렬 */}
        <div ref={containerRef} className={styles.carouselContainer}>
          {/* 캐로셀 트랙 */}
          <div
            ref={carouselRef}
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {processSteps.map((step, index) => (
              <BlurFadeDiv key={step.id} delay={1700 + index * 150}>
                <Card
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  variant="elevated"
                  padding="none"
                  className={`${styles.card} ${
                    step.id === currentStep ? styles.active : ""
                  }`}
                  onClick={handleStepClick(step.id)}
                >
                  {step.content}
                  <div className={styles.cardContent}>
                    <span className={styles.cardNumber}>{step.number}</span>
                    <span className={styles.cardTitle}>{step.title}</span>
                  </div>
                </Card>
              </BlurFadeDiv>
            ))}
          </div>
        </div>
      </div>

      {/* bottom background gradient */}
      <div className={styles.bgGradientBottom} />

      {/* bottom center background gradient */}
      <div className={styles.bgGradientCenter} data-name="background 4">
        <div className={styles.bgGradientInner}>
          <svg
            className={styles.bgSvg}
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 2953 2722"
          >
            <g id="background 4">
              <g filter="url(#filter0_f_1_1053)" id="Ellipse 2">
                <ellipse
                  cx="1476.54"
                  cy="1236"
                  fill="url(#paint0_radial_1_1053)"
                  fillOpacity="0.1"
                  rx="450"
                  ry="736"
                />
              </g>
              <g filter="url(#filter1_f_1_1053)" id="Ellipse 1">
                <ellipse
                  cx="1476.39"
                  cy="1235.81"
                  fill="url(#paint1_radial_1_1053)"
                  rx="976.388"
                  ry="709.001"
                />
              </g>
              <g filter="url(#filter2_f_1_1053)" id="Ellipse 5">
                <ellipse
                  cx="1476.54"
                  cy="1486"
                  fill="url(#paint2_radial_1_1053)"
                  rx="720"
                  ry="736"
                />
              </g>
              <g filter="url(#filter3_f_1_1053)" id="Ellipse 4">
                <ellipse
                  cx="1476.54"
                  cy="1271.5"
                  fill="url(#paint3_linear_1_1053)"
                  rx="381"
                  ry="635.5"
                />
              </g>
              <g filter="url(#filter4_f_1_1053)" id="Ellipse 6">
                <ellipse
                  cx="1476.54"
                  cy="1271.5"
                  fill="url(#paint4_linear_1_1053)"
                  rx="656"
                  ry="139.5"
                />
              </g>
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="2472"
                id="filter0_f_1_1053"
                width="1900"
                x="526.542"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_1_1053"
                  stdDeviation="250"
                />
              </filter>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="2418"
                id="filter1_f_1_1053"
                width="2952.78"
                x="-1.52588e-05"
                y="26.8041"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_1_1053"
                  stdDeviation="250"
                />
              </filter>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="2472"
                id="filter2_f_1_1053"
                width="2440"
                x="256.542"
                y="250"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_1_1053"
                  stdDeviation="250"
                />
              </filter>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="2071"
                id="filter3_f_1_1053"
                width="1562"
                x="695.542"
                y="236"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_1_1053"
                  stdDeviation="200"
                />
              </filter>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="479"
                id="filter4_f_1_1053"
                width="1512"
                x="720.542"
                y="1032"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_1_1053"
                  stdDeviation="50"
                />
              </filter>
              <radialGradient
                cx="0"
                cy="0"
                gradientTransform="matrix(-22.447 659.623 -403.302 -36.771 1479.19 1345.36)"
                gradientUnits="userSpaceOnUse"
                id="paint0_radial_1_1053"
                r="1"
              >
                <stop stopColor="#FFDED0" />
                <stop offset="0.577448" stopColor="#FF7D45" />
              </radialGradient>
              <radialGradient
                cx="0"
                cy="0"
                gradientTransform="matrix(-48.7043 635.426 -875.065 -35.4221 1482.14 1341.15)"
                gradientUnits="userSpaceOnUse"
                id="paint1_radial_1_1053"
                r="1"
              >
                <stop stopColor="#FDFF85" />
                <stop
                  offset="0.984375"
                  stopColor="#FDFF85"
                  stopOpacity="0.43"
                />
              </radialGradient>
              <radialGradient
                cx="0"
                cy="0"
                gradientTransform="matrix(-2.8913e-05 770.61 -785.777 -44.5471 1475.99 1485.46)"
                gradientUnits="userSpaceOnUse"
                id="paint2_radial_1_1053"
                r="1"
              >
                <stop stopColor="#00C9D2" />
                <stop offset="0.536458" stopColor="#00C9D2" />
              </radialGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint3_linear_1_1053"
                x1="1476.54"
                x2="1476.54"
                y1="636"
                y2="1907"
              >
                <stop stopColor="#00AB55" stopOpacity="0.82" />
                <stop offset="1" stopColor="#00AB55" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint4_linear_1_1053"
                x1="1476.54"
                x2="1476.54"
                y1="1132"
                y2="1411"
              >
                <stop stopColor="#007B55" stopOpacity="0.82" />
                <stop offset="1" stopColor="#00AB55" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </main>
  );
};

export default Hero;
