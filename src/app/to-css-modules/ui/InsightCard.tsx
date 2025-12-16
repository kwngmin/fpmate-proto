"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { useScrollTo } from "@/shared/lib/use-scroll-to";
import styles from "./InsightCard.module.css";

interface InsightCardProps {
  chips: {
    id: number;
    label: string;
    color: string;
  }[];
  title: string;
  fp: number;
  amount: number;
  date: string;
  cardIndex: number;
}

/**
 * 툴팁 컴포넌트 (DRY 원칙)
 * @param label - 툴팁에 표시할 텍스트
 * @param isVisible - 툴팁 표시 여부
 * @param className - 추가 CSS 클래스
 * @returns 툴팁 JSX 또는 null
 */
const Tooltip = ({
  label,
  isVisible,
  className = "",
}: {
  label: string;
  isVisible: boolean;
  className?: string;
}) => {
  if (!isVisible) return null;

  return (
    <div className={`${styles.tooltip} ${className}`}>
      {label}
      <div className={styles.tooltipArrow} />
    </div>
  );
};

/**
 * 그라데이션 링이 있는 버튼 컴포넌트
 * @param onClick - 클릭 핸들러
 * @param isFirstCard - 첫 번째 카드 여부
 * @param children - 자식 요소
 * @param order - 애니메이션 순서 (기본값: 1)
 * @returns 그라데이션 링 버튼 JSX
 */
const GradientRingButton = ({
  onClick,
  isFirstCard = false,
  children,
  order = 1,
}: {
  onClick: () => void;
  isFirstCard: boolean;
  children: React.ReactNode;
  order?: number;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.gradientButton} ${
        isFirstCard ? styles.gradientButtonFirst : styles.gradientButtonNotFirst
      }`}
    >
      {/* 회전하는 그라데이션 ring */}
      <span
        className={`${styles.gradientRing} ${
          isFirstCard ? "" : styles.gradientRingHidden
        }`}
        style={{
          background:
            "conic-gradient(from 0deg, #10b981, #119799, white, #066847)",
          animationDuration: `${order * 0.5 * 3}s`,
        }}
      >
        <span className={styles.gradientInner} />
      </span>
      {children}
    </button>
  );
};

/**
 * 인사이트 카드 컴포넌트
 * @param chips - 배지 칩 목록
 * @param title - 카드 제목
 * @param fp - 기능 점수
 * @param amount - 개발비
 * @param date - 선정완료일
 * @param cardIndex - 카드 인덱스 (1부터 시작)
 * @returns 인사이트 카드 JSX
 */
const InsightCard = ({
  chips,
  title,
  fp,
  amount,
  date,
  cardIndex,
}: InsightCardProps) => {
  const { scrollTo: scrollToTable } = useScrollTo(64);
  const { scrollTo: scrollToChart } = useScrollTo(316);

  const isFirst = cardIndex === 1;

  // 모바일에서 isFirst일 때 툴팁 번갈아 표시 (0: 최종 리포트, 1: 분석 그래프)
  const [activeTooltip, setActiveTooltip] = useState<0 | 1>(0);

  useEffect(() => {
    if (!isFirst) return;

    const interval = setInterval(() => {
      setActiveTooltip((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, [isFirst]);

  return (
    <Card
      variant="bordered"
      hoverable
      padding="sm"
      className={`${styles.card} ${
        isFirst ? styles.cardFirst : styles.cardNotFirst
      }`}
    >
      <div className={styles.header}>
        <div className={styles.chips}>
          {chips.map((chip) => (
            <Badge
              key={chip.id}
              className={`${styles.badge} ${
                isFirst ? styles.badgeFirst : styles.badgeNotFirst
              }`}
              variant={
                chip.color === "red"
                  ? "error"
                  : chip.color === "blue"
                  ? "info"
                  : chip.color === "green"
                  ? "success"
                  : "default"
              }
              size="lg"
            >
              {chip.label}
            </Badge>
          ))}
        </div>
        <div className={styles.actions}>
          <GradientRingButton
            onClick={() => scrollToTable("section3-table")}
            isFirstCard={isFirst}
          >
            {/* isFirst: 모바일에서 번갈아 표시, 데스크톱에서 hover 시 표시 */}
            {isFirst && (
              <>
                {/* 모바일: 4초 간격 번갈아 표시 */}
                <Tooltip
                  label="최종 리포트"
                  isVisible={activeTooltip === 0}
                  className={`${styles.tooltipMobileOnly} ${styles.tooltipBounce}`}
                />
                {/* 데스크톱: hover 시 표시 */}
                <Tooltip
                  label="최종 리포트"
                  isVisible
                  className={styles.tooltipDesktopHover}
                />
              </>
            )}
            {/* cardIndex === 2: 데스크톱에서만 bounce 애니메이션 */}
            {cardIndex === 2 && (
              <Tooltip
                label="최종 리포트"
                isVisible
                className={`${styles.tooltipDesktopOnly} ${styles.tooltipBounce}`}
              />
            )}
            {/* cardIndex === 3: hover 시에만 표시 (데스크톱 제외) */}
            {cardIndex === 3 && (
              <Tooltip
                label="최종 리포트"
                isVisible
                className={styles.tooltipHoverOnly}
              />
            )}
            <Image
              src="/assets/svgs/note.svg"
              alt="note-icon"
              width={28}
              height={28}
              className={styles.icon}
            />
          </GradientRingButton>
          <GradientRingButton
            onClick={() => scrollToChart("section3-chart")}
            isFirstCard={isFirst}
            order={2}
          >
            {/* isFirst: 모바일에서 번갈아 표시, 데스크톱에서 hover 시 표시 */}
            {isFirst && (
              <>
                {/* 모바일: 4초 간격 번갈아 표시 */}
                <Tooltip
                  label="분석 그래프"
                  isVisible={activeTooltip === 1}
                  className={`${styles.tooltipMobileOnly} ${styles.tooltipBounce}`}
                />
                {/* 데스크톱: hover 시 표시 */}
                <Tooltip
                  label="분석 그래프"
                  isVisible
                  className={styles.tooltipDesktopHover}
                />
              </>
            )}
            {/* cardIndex === 2: hover 시에만 표시 (데스크톱 제외) */}
            {cardIndex === 2 && (
              <Tooltip
                label="분석 그래프"
                isVisible
                className={styles.tooltipHoverOnly}
              />
            )}
            {/* cardIndex === 3: 데스크톱에서만 bounce 애니메이션 */}
            {cardIndex === 3 && (
              <Tooltip
                label="분석 그래프"
                isVisible
                className={`${styles.tooltipDesktopOnly} ${styles.tooltipBounceDelay}`}
              />
            )}
            <Image
              src="/assets/svgs/chart-bar.svg"
              alt="chart-icon"
              width={28}
              height={28}
              className={styles.icon}
            />
          </GradientRingButton>
        </div>
      </div>

      {/* 프로젝트 정보 */}
      <div className={styles.title}>
        <span className={styles.titleText}>{title}</span>
      </div>

      {/* 내역 */}
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>총 기능 점수</span>
          <span className={styles.detailValue}>
            <span className={styles.detailValueBold}>{fp}</span>
            FP
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>소프트웨어 개발비</span>
          <span className={styles.detailValue}>
            <span className={styles.detailValueBold}>
              {amount.toLocaleString()}
            </span>
            원
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerText}>
          {`선정완료일: ${date} 담당자:`}
        </span>{" "}
        <div className={styles.avatar}>
          <div className={styles.avatarHead} />
          <div className={styles.avatarBody} />
        </div>
      </div>
    </Card>
  );
};

export default InsightCard;
