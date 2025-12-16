"use client";

import { useIntersectionObserver } from "@/shared/lib/use-intersection-observer";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Diagram.module.css";

interface GradientBeamProps {
  direction: "ltr" | "rtl";
  opacity: number;
  duration: number;
}

const GradientBeam = ({ direction, opacity, duration }: GradientBeamProps) => {
  const gradient = `linear-gradient(90deg, transparent, rgba(0, 123, 85, ${opacity}), transparent)`;
  const animateX = direction === "ltr" ? ["-100%", "100%"] : ["100%", "-100%"];

  return (
    <motion.div
      className={styles.gradientBeamLayer}
      style={{ background: gradient }}
      animate={{ x: animateX }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
};

export function GradientBeamAnimation() {
  return (
    <div className={styles.gradientBeamContainer}>
      <GradientBeam direction="ltr" opacity={0.025} duration={3} />
      <GradientBeam direction="rtl" opacity={0.1} duration={4} />
    </div>
  );
}

type FocusState = "smart-pricing" | "error-validation";
type FileType = "hwp" | "pdf" | "xls" | "doc" | "txt";

interface FileTypeConfig {
  label: string;
  display: string;
  bgClass: string;
}

const FILE_TYPE_CONFIG: Record<FileType, FileTypeConfig> = {
  hwp: { label: "한글", display: "HWP", bgClass: styles.fileTypeBadgeHwp },
  pdf: { label: "PDF", display: "PDF", bgClass: styles.fileTypeBadgePdf },
  xls: { label: "엑셀", display: "XLS", bgClass: styles.fileTypeBadgeXls },
  doc: { label: "워드", display: "DOC", bgClass: styles.fileTypeBadgeDoc },
  txt: { label: "텍스트", display: "TXT", bgClass: styles.fileTypeBadgeTxt },
};

const FILE_TYPE_ORDER: FileType[] = ["hwp", "pdf", "xls", "doc", "txt"];

interface Point {
  x: number;
  y: number;
}

interface AnimatedLineProps {
  points: Point[];
  isActive: boolean;
  delay?: number;
  duration?: number;
  color?: string;
}

/**
 * 애니메이션 라인 컴포넌트
 * LiveKit 스타일의 흐르는 점선 애니메이션 (stroke-dasharray + stroke-dashoffset)
 */
const AnimatedLine = ({
  points,
  isActive,
  color = "#22c55e",
}: AnimatedLineProps) => {
  const generatePath = useCallback((pts: Point[]): string => {
    if (pts.length < 2) return "";

    const radius = 10;
    let d = `M${pts[0].x},${pts[0].y}`;

    for (let i = 1; i < pts.length - 1; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const next = pts[i + 1];

      const dx1 = curr.x - prev.x;
      const dy1 = curr.y - prev.y;
      const dx2 = next.x - curr.x;
      const dy2 = next.y - curr.y;

      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      const r = Math.min(radius, dist1 / 2, dist2 / 2);

      const startX = curr.x - (dx1 / dist1) * r;
      const startY = curr.y - (dy1 / dist1) * r;
      const endX = curr.x + (dx2 / dist2) * r;
      const endY = curr.y + (dy2 / dist2) * r;

      d += ` L${startX},${startY}`;
      d += ` Q${curr.x},${curr.y} ${endX},${endY}`;
    }

    const last = pts[pts.length - 1];
    d += ` L${last.x},${last.y}`;

    return d;
  }, []);

  const pathD = useMemo(() => generatePath(points), [points, generatePath]);

  return (
    <g>
      <path
        d={pathD}
        stroke={isActive ? color : "#bababa"}
        strokeWidth={isActive ? "3" : "2"}
        fill="none"
        strokeLinecap="round"
        strokeOpacity={isActive ? 0.3 : 0.5}
        className={styles.animatedLineBackground}
      />
      {isActive && (
        <path
          d={pathD}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 8"
          strokeLinecap="round"
          className={styles.animatedLineFlow}
        />
      )}
    </g>
  );
};

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const Card = ({
  children,
  className = "",
  isHighlighted = false,
}: CardProps) => (
  <div
    className={`${
      isHighlighted ? styles.cardHighlighted : styles.cardDefault
    } ${className}`}
  >
    {children}
  </div>
);

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const Label = ({
  children,
  className = "",
  isHighlighted = false,
}: LabelProps) => (
  <div
    className={`${
      isHighlighted ? styles.labelHighlighted : styles.labelDefault
    } ${className}`}
  >
    <span style={{ opacity: 1 }}>{children}</span>
  </div>
);

interface ButtonLabelProps {
  children: React.ReactNode;
  icon: string;
  isHighlighted?: boolean;
}

const ButtonLabel = ({
  children,
  icon,
  isHighlighted = false,
}: ButtonLabelProps) => (
  <div
    className={
      isHighlighted ? styles.buttonLabelHighlighted : styles.buttonLabelDefault
    }
  >
    <Image
      src={icon}
      alt=""
      width={16}
      height={16}
      className={styles.buttonLabelIcon}
    />
    <span style={{ opacity: 1 }}>{children}</span>
  </div>
);

interface FeatureCardProps {
  children: React.ReactNode;
  icon: string;
  isHighlighted?: boolean;
}

const FeatureCard = ({
  children,
  icon,
  isHighlighted = false,
}: FeatureCardProps) => (
  <div
    className={
      isHighlighted ? styles.featureCardHighlighted : styles.featureCardDefault
    }
  >
    <Image
      src={icon}
      alt=""
      width={16}
      height={16}
      className={styles.featureCardIcon}
    />
    {children}
  </div>
);

interface ResultCardProps {
  children: React.ReactNode;
  icon: string;
  isHighlighted?: boolean;
}

const ResultCard = ({
  children,
  icon,
  isHighlighted = false,
}: ResultCardProps) => (
  <div
    className={
      isHighlighted ? styles.resultCardHighlighted : styles.resultCardDefault
    }
  >
    <div className={styles.resultCardInner}>
      <div className={styles.resultCardContent}>
        <Image
          src={icon}
          alt=""
          width={16}
          height={16}
          className={styles.resultCardIcon}
        />
        {children}
      </div>
    </div>
  </div>
);

interface FileTypeCardProps {
  fileType: FileType;
  isHighlighted?: boolean;
}

const FileTypeCard = ({
  fileType,
  isHighlighted = false,
}: FileTypeCardProps) => {
  const config = FILE_TYPE_CONFIG[fileType];

  return (
    <motion.div
      key={fileType}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={styles.fileTypeCardWrapper}
    >
      <div className={styles.fileTypeLabelWrapper}>
        <div className={styles.fileTypeLabelInner}>
          <Label className={styles.labelWidth13} isHighlighted={isHighlighted}>
            {config.label}
          </Label>
        </div>
      </div>
      <div className={styles.fileTypeCardContainer}>
        <div className={styles.fileTypeCardInner}>
          <Card
            className={`${styles.cardSmall} ${styles.cardPadding3}`}
            isHighlighted={isHighlighted}
          >
            <span className={`${styles.fileTypeBadge} ${config.bgClass}`}>
              {config.display}
            </span>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

interface PulseIndicatorProps {
  isMobile?: boolean;
}

const PulseIndicator = ({ isMobile = false }: PulseIndicatorProps) => (
  <span
    className={
      isMobile ? styles.pulseIndicatorMobile : styles.pulseIndicatorDesktop
    }
  >
    <span className={styles.pulsePing} />
    <span className={styles.pulseDot} />
  </span>
);

const ACTIVE_COLOR = "#00AB55";
const BASE_X = 790;
const FOCUS_INTERVAL_MS = 10000;
const FILE_TYPE_INTERVAL_MS = 3000;
const INITIAL_DELAY_MS = 300;

const Diagram = () => {
  const [focusState, setFocusState] = useState<FocusState>("smart-pricing");
  const [fileTypeIndex, setFileTypeIndex] = useState<number>(0);
  const [isAnimationStarted, setIsAnimationStarted] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const { ref: diagramRef, isIntersecting: isDiagramIntersecting } =
    useIntersectionObserver({
      threshold: 0.3,
      once: true,
    });

  const currentFileType = FILE_TYPE_ORDER[fileTypeIndex];

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsAnimationStarted(true);
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusState((prev) =>
        prev === "smart-pricing" ? "error-validation" : "smart-pricing"
      );
    }, FOCUS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [resetTrigger, isAnimationStarted]);

  useEffect(() => {
    if (focusState === "error-validation") return;

    const fileTypeInterval = setInterval(() => {
      setFileTypeIndex((prev) => (prev + 1) % FILE_TYPE_ORDER.length);
    }, FILE_TYPE_INTERVAL_MS);

    return () => clearInterval(fileTypeInterval);
  }, [focusState]);

  const isSmartPricing = focusState === "smart-pricing";
  const isErrorValidation = focusState === "error-validation";

  const pos = useMemo(
    () => ({
      user: { x: BASE_X - 89 + 36, y: 297 + 28 },
      requirement: { x: BASE_X + 8 + 25, y: 297 + 28 },
      upload: { x: BASE_X + 112 + 40 + 25, y: 297 + 28 },
      developmentScale: { x: 1043 + 70 + 40, y: 297 + 28 },
      costEstimation: { x: BASE_X + 180 + 50, y: 484 + 15 },
      web: { x: BASE_X - 32, y: 589 + 30 },
      pdf: { x: BASE_X + 68, y: 589 + 30 },
      xls: { x: BASE_X + 168, y: 589 + 30 },
      userInput: { x: BASE_X + 74 + 50, y: 339 + 24 },
      autoValidation: { x: BASE_X + 320 + 50, y: 339 + 24 },
      dataDuplicate: { x: BASE_X + 320 + 50, y: 530 + 15 },
      dataError: { x: BASE_X + 320 + 50, y: 568 + 15 },
      dataMissing: { x: BASE_X + 320 + 50, y: 606 + 15 },
    }),
    []
  );

  const smartPaths = useMemo(
    () => ({
      path1: [
        { x: pos.user.x, y: pos.user.y },
        { x: pos.requirement.x, y: pos.requirement.y },
      ],
      path2: [
        { x: pos.requirement.x + 35, y: pos.requirement.y },
        { x: pos.upload.x - 40, y: pos.upload.y },
      ],
      path3: [
        { x: pos.upload.x + 30, y: pos.upload.y },
        { x: pos.developmentScale.x - 50, y: pos.developmentScale.y },
      ],
      path4: [
        { x: pos.developmentScale.x + 50, y: pos.developmentScale.y },
        { x: pos.developmentScale.x + 114, y: pos.developmentScale.y },
        { x: pos.developmentScale.x + 114, y: pos.costEstimation.y },
        { x: pos.costEstimation.x + 50, y: pos.costEstimation.y },
      ],
      pathToWeb: [
        { x: pos.costEstimation.x - 10, y: pos.costEstimation.y + 20 },
        { x: pos.costEstimation.x - 10, y: pos.web.y - 70 },
        { x: pos.web.x + 20, y: pos.web.y - 70 },
        { x: pos.web.x + 20, y: pos.web.y - 20 },
      ],
      pathToPdf: [
        { x: pos.costEstimation.x - 10, y: pos.costEstimation.y + 20 },
        { x: pos.costEstimation.x - 10, y: pos.pdf.y - 70 },
        { x: pos.pdf.x + 20, y: pos.pdf.y - 70 },
        { x: pos.pdf.x + 20, y: pos.pdf.y - 20 },
      ],
      pathToXls: [
        { x: pos.costEstimation.x - 10, y: pos.costEstimation.y + 20 },
        { x: pos.costEstimation.x - 10, y: pos.xls.y - 70 },
        { x: pos.xls.x + 20, y: pos.xls.y - 70 },
        { x: pos.xls.x + 20, y: pos.xls.y - 20 },
      ],
    }),
    [pos]
  );

  const errorPaths = useMemo(
    () => ({
      path1: [
        { x: pos.user.x - 18, y: pos.user.y + 20 },
        { x: pos.user.x - 18, y: pos.userInput.y + 12 },
        { x: pos.userInput.x - 50, y: pos.userInput.y + 12 },
      ],
      path3: [
        { x: pos.userInput.x + 50, y: pos.userInput.y + 12 },
        { x: pos.autoValidation.x - 40, y: pos.autoValidation.y + 12 },
      ],
      path4: [
        { x: pos.autoValidation.x + 5, y: pos.autoValidation.y },
        { x: pos.dataDuplicate.x + 5, y: pos.dataDuplicate.y - 15 },
      ],
      path5: [
        { x: pos.dataDuplicate.x + 5, y: pos.dataDuplicate.y + 20 },
        { x: pos.dataError.x + 5, y: pos.dataError.y - 15 },
      ],
      path6: [
        { x: pos.dataError.x + 5, y: pos.dataError.y + 20 },
        { x: pos.dataMissing.x + 5, y: pos.dataMissing.y - 15 },
      ],
    }),
    [pos]
  );

  const handleSmartPricingClick = useCallback(() => {
    if (focusState !== "smart-pricing") {
      setFocusState("smart-pricing");
    }
    setResetTrigger((prev) => prev + 1);
  }, [focusState]);

  const handleErrorValidationClick = useCallback(() => {
    if (focusState !== "error-validation") {
      setFocusState("error-validation");
    }
    setResetTrigger((prev) => prev + 1);
  }, [focusState]);

  const getTransitionStyle = (delay: number) => ({
    opacity: isDiagramIntersecting ? 1 : 0,
    transform: isDiagramIntersecting ? "translateY(0)" : "translateY(-10px)",
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
    willChange: "opacity, transform" as const,
  });

  return (
    <div
      className={styles.diagramContainer}
      ref={diagramRef as React.RefObject<HTMLDivElement>}
    >
      <div className={styles.titleContainer}>
        <div className={styles.mainTitle}>
          <span className={styles.brandText}>FPMate</span>로
          <br />
          스마트하게 산정해 보세요
        </div>
        <div className={styles.descriptionWrapper}>
          <p className={styles.descriptionText}>
            반복되고 소모적인 작업은 줄이고 합리적인 비용 판단 분석에 집중해
            보세요.
          </p>
        </div>
      </div>

      <div className={styles.diagramArea}>
        <div className={styles.selectedSection}>
          <div className={styles.selectedSectionInner}>
            <div className={styles.buttonContainer}>
              <button
                type="button"
                style={getTransitionStyle(0.9)}
                onClick={handleSmartPricingClick}
                className={
                  isSmartPricing
                    ? styles.selectionButtonActive
                    : styles.selectionButton
                }
              >
                <div className={styles.buttonHeader}>
                  <div className={styles.buttonIconWrapper}>
                    <Image
                      src="/assets/svgs/cpu.svg"
                      alt="AI와 자동산정으로 구현하는 스마트 대가산정"
                      width={24}
                      height={24}
                      className={styles.buttonIcon}
                    />
                    {isSmartPricing && <PulseIndicator isMobile />}
                  </div>
                  <div className={styles.buttonTitleWrapper}>
                    <span className={styles.buttonTitle}>
                      AI와 자동산정으로 구현하는 스마트 대가산정
                    </span>
                    {isSmartPricing && <PulseIndicator />}
                  </div>
                </div>
                <p className={styles.buttonDescription}>
                  요구사항 문서를 입력하는 순간, AI가 내용을 분석해 기능을 자동
                  추천하고 전문가 도움 없이도 누구나 쉽게 비용을 산정 할 수
                  있습니다.
                </p>
              </button>

              <button
                type="button"
                style={getTransitionStyle(1.2)}
                onClick={handleErrorValidationClick}
                className={
                  isErrorValidation
                    ? styles.selectionButtonActive
                    : styles.selectionButton
                }
              >
                <div className={styles.buttonHeader}>
                  <div className={styles.buttonIconWrapper}>
                    <Image
                      src="/assets/svgs/chart-line-up.svg"
                      alt="편리한 오류 검증으로 향상되는 업무 효율"
                      width={16}
                      height={16}
                      className={styles.buttonIcon}
                    />
                    {isErrorValidation && <PulseIndicator isMobile />}
                  </div>
                  <div className={styles.buttonTitleWrapper}>
                    <span className={styles.buttonTitle}>
                      편리한 오류 검증으로 향상되는 업무 효율
                    </span>
                    {isErrorValidation && <PulseIndicator />}
                  </div>
                </div>
                <p className={styles.buttonDescription}>
                  FPMate가 데이터의 중복, 오류, 누락을 확인해 업무 부담은 줄이고
                  결과의 신뢰도는 높입니다.
                </p>
              </button>
            </div>
          </div>
        </div>

        <div
          className={styles.backgroundGrid}
          style={{
            opacity: isDiagramIntersecting ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.6s",
            willChange: "opacity",
          }}
        >
          <div className={styles.gridInner}>
            <div className={styles.isometricContainer}>
              <div className={styles.gridImageWrapper}>
                <Image
                  src="/hero-grid.svg"
                  alt="FPMate"
                  width={1579.97}
                  height={1096.29}
                  className={styles.gridImage}
                />
              </div>

              <svg className={styles.svgLinesLayer}>
                <defs>
                  <filter
                    id="lineGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <AnimatedLine
                  points={smartPaths.path1}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.path2}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.path3}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.path4}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.pathToWeb}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.pathToPdf}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.pathToXls}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />

                <AnimatedLine
                  points={errorPaths.path1}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={errorPaths.path3}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={errorPaths.path4}
                  isActive={isErrorValidation}
                  delay={0.9}
                  duration={2}
                />
                <AnimatedLine
                  points={errorPaths.path5}
                  isActive={isErrorValidation}
                  delay={1.2}
                  duration={2}
                />
                <AnimatedLine
                  points={errorPaths.path6}
                  isActive={isErrorValidation}
                  delay={1.5}
                  duration={2}
                />
              </svg>

              <Card
                className={`${styles.userCard} ${styles.cardSmall}`}
                isHighlighted={isSmartPricing || isErrorValidation}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                  className={styles.userIcon}
                >
                  <path
                    d="M12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2Z"
                    fill="currentcolor"
                  />
                  <path
                    d="M11.9989 12C7.21736 12 3.91209 15.7691 3.50083 20.4563L3.45312 21H20.5447L20.497 20.4563C20.0857 15.7691 16.7805 12 11.9989 12Z"
                    fill="currentcolor"
                  />
                </svg>
              </Card>

              <div className={styles.requirementLabel}>
                <div className={styles.requirementLabelInner}>
                  <div className={styles.requirementText}>
                    요구사항 (<span className={styles.fileTypeRed}>PDF</span>
                    <span className={styles.fileTypeSeparator}>/</span>
                    <span className={styles.fileTypeBlue}>DOC</span>
                    <span className={styles.fileTypeSeparator}>/</span>
                    <span className={styles.fileTypeGreen}>XLS</span>
                    <span className={styles.fileTypeSeparator}>/</span>
                    <span className={styles.fileTypeSky}>HWP</span>
                    <span className={styles.fileTypeSeparator}>/</span>
                    <span className={styles.fileTypeBlack}>TXT</span>)
                  </div>
                </div>
              </div>

              <div className={styles.fileTypeCardPosition}>
                <AnimatePresence mode="wait">
                  <FileTypeCard
                    key={currentFileType}
                    fileType={currentFileType}
                    isHighlighted={isSmartPricing}
                  />
                </AnimatePresence>
              </div>

              <div className={styles.uploadButton}>
                <ButtonLabel
                  icon="/assets/svgs/upload-simple.svg"
                  isHighlighted={isSmartPricing}
                >
                  업로드
                </ButtonLabel>
              </div>

              <div className={styles.userInputButton}>
                <ButtonLabel
                  icon="/assets/svgs/key-return.svg"
                  isHighlighted={isErrorValidation}
                >
                  사용자 입력
                </ButtonLabel>
              </div>

              <div className={styles.fpmateAiContainer}>
                <Card
                  className={`${styles.fpmateLogoCard} ${styles.cardSmall}`}
                  isHighlighted
                >
                  <div className={styles.resultCardInner}>
                    <Image
                      src="/assets/logo/fpmate-symbol.svg"
                      alt="FPMate"
                      width={16}
                      height={16}
                      className={styles.fpmateLogo}
                    />
                  </div>
                </Card>

                <div className={styles.fpmateAiLabel}>
                  <div className={styles.fpmateAiLabelInner}>FPMate A.I.</div>
                </div>

                <FeatureCard
                  icon="/assets/svgs/scan.svg"
                  isHighlighted={isSmartPricing}
                >
                  개발규모 식별
                </FeatureCard>

                <FeatureCard
                  icon="/assets/svgs/arrows-clockwise.svg"
                  isHighlighted={isErrorValidation}
                >
                  자동 검증
                </FeatureCard>
              </div>

              <div className={styles.costEstimationCard}>
                <ResultCard
                  icon="/assets/svgs/table.svg"
                  isHighlighted={isSmartPricing}
                >
                  비용 산정
                </ResultCard>
              </div>

              <div className={styles.dataDuplicateCard}>
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 중복
                </ResultCard>
              </div>

              <div className={styles.dataErrorCard}>
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 오류
                </ResultCard>
              </div>

              <div className={styles.dataMissingCard}>
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 누락
                </ResultCard>
              </div>

              <div className={styles.webCard}>
                <div className={styles.outputLabelWrapper}>
                  <Label
                    className={styles.labelWidth12}
                    isHighlighted={isSmartPricing}
                  >
                    Web
                  </Label>
                </div>
                <div className={styles.outputCardInner}>
                  <Card
                    className={`${styles.cardSmall} ${styles.cardPadding2}`}
                    isHighlighted={isSmartPricing}
                  >
                    <Image
                      src="/assets/svgs/globe.svg"
                      alt="web"
                      width={16}
                      height={16}
                      className={styles.globeIcon}
                    />
                  </Card>
                </div>
              </div>

              <div className={styles.pdfCard}>
                <div className={styles.outputLabelWrapper}>
                  <Label
                    className={styles.labelWidth12}
                    isHighlighted={isSmartPricing}
                  >
                    PDF
                  </Label>
                </div>
                <div className={styles.outputCardInner}>
                  <Card
                    className={`${styles.cardSmall} ${styles.cardPadding3}`}
                    isHighlighted={isSmartPricing}
                  >
                    <span
                      className={`${styles.fileTypeBadge} ${styles.fileTypeBadgePdf}`}
                    >
                      PDF
                    </span>
                  </Card>
                </div>
              </div>

              <div className={styles.xlsCard}>
                <div className={styles.outputLabelWrapper}>
                  <Label
                    className={styles.labelWidth12}
                    isHighlighted={isSmartPricing}
                  >
                    엑셀
                  </Label>
                </div>
                <div className={styles.outputCardInner}>
                  <Card
                    className={`${styles.cardSmall} ${styles.cardPadding3}`}
                    isHighlighted={isSmartPricing}
                  >
                    <span
                      className={`${styles.fileTypeBadge} ${styles.fileTypeBadgeXls}`}
                    >
                      XLS
                    </span>
                  </Card>
                </div>
              </div>

              <div className={styles.backboardPanel}>
                <div className={styles.backboardPulse} />
                <div className={styles.backboardContent}>
                  <div className={styles.backboardContentInner}>
                    <div className={styles.backboardText}>
                      산정에서 관리까지,
                      <br />
                      쉽고 빠르게, AI로 스마트하게!
                    </div>
                  </div>
                </div>
                <GradientBeamAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagram;
