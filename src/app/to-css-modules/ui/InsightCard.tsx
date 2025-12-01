"use client";

import Image from "next/image";
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
  managerImage: string;
  isFirst?: boolean;
}

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

const InsightCard = ({
  chips,
  title,
  fp,
  amount,
  date,
  managerImage,
  isFirst = false,
}: InsightCardProps) => {
  const { scrollTo: scrollToTable } = useScrollTo(64);
  const { scrollTo: scrollToChart } = useScrollTo(316);

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
            <Image
              src="/assets/svgs/note.svg"
              alt="noter-icon"
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
            <Image
              src="/assets/svgs/chart-bar.svg"
              alt="noter-icon"
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
        <Image
          src={managerImage}
          alt="avatar-placeholder"
          width={36}
          height={36}
          className={styles.avatar}
        />
      </div>
    </Card>
  );
};

export default InsightCard;

