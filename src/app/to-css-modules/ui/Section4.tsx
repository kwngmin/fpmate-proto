"use client";

import { useIntersectionObserver } from "@/shared/lib/use-intersection-observer";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";
import styles from "./Section4.module.css";

interface ListItem {
  title: string;
  description: string | null;
}

interface ContentItem {
  id: number;
  key: string;
  title: string;
  icon: string;
  listItems: ListItem[];
}

const contents: ContentItem[] = [
  {
    id: 1,
    key: "ai-recommendation",
    title: "AI 추천 기능",
    icon: "cpu",
    listItems: [
      { title: "업무 및 기능 식별 자동화", description: "업무 및 기능 추천" },
      {
        title: "기능 유형 판단 자동화",
        description: "EI, EO, EQ, ILF 등 기능 유형 추천",
      },
    ],
  },
  {
    id: 2,
    key: "fp-automation",
    title: "FP산정 자동화",
    icon: "arrows-clockwise",
    listItems: [
      { title: "산정 유형에 따른 기능 점수 자동 계산", description: null },
      { title: "업무별 기능 점수 합계 자동 계산", description: null },
      { title: "FP 측정 결과 즉시 확인", description: null },
      { title: "FP 기반 SW 사업비용 산정", description: null },
    ],
  },
  {
    id: 3,
    key: "data-verification",
    title: "데이터 검증",
    icon: "list-checks",
    listItems: [
      { title: "중복검사", description: null },
      { title: "명칭 오류 검사", description: null },
      { title: "속성 미작성 검사", description: null },
      { title: "기능 유형 판단 오류 검증", description: null },
    ],
  },
  {
    id: 4,
    key: "guidance",
    title: "오류 수정 가이드",
    icon: "warning",
    listItems: [
      { title: "오류 유형별 수정 가이드", description: null },
      { title: "확인 필요 사항에 대한 쉬운 탐색", description: null },
      { title: "정확한 산정 유도", description: null },
    ],
  },
  {
    id: 5,
    key: "report",
    title: "산정결과 리포트",
    icon: "newspaper",
    listItems: [
      { title: "산정 내역 축척", description: null },
      { title: "산정 내역 접근 권한 관리", description: null },
      { title: "비용 산정 진행 관리", description: null },
      { title: "산정 보고서", description: null },
      { title: "산정 내역 분석", description: null },
    ],
  },
  {
    id: 6,
    key: "data-utilization",
    title: "데이터 활용",
    icon: "database",
    listItems: [
      { title: "산정 결과 재활용", description: null },
      { title: "산정 데이터를 활용한 추천", description: null },
      { title: "산정 결과 통계 및 시각화", description: null },
      { title: "산정결과 비교 기능 제공", description: null },
      { title: "경영 인사이트 제공", description: null },
    ],
  },
];

type LabelColorType = "green" | "lime" | "teal";
type ListColorType = "slate" | "stone";

const LABEL_COLOR_CLASSES: Record<LabelColorType, string> = {
  green: styles.cardLabelGreen,
  lime: styles.cardLabelLime,
  teal: styles.cardLabelTeal,
};

const LIST_COLOR_CLASSES: Record<ListColorType, string> = {
  slate: styles.cardListSlate,
  stone: styles.cardListStone,
};

const getLabelColor = (index: number): LabelColorType => {
  const position = (index + 1) % 3;
  if (position === 0) return "green";
  if (position === 1) return "lime";
  return "teal";
};

const getListColor = (index: number): ListColorType => {
  return (index + 1) % 2 === 0 ? "slate" : "stone";
};

const getTransitionStyle = (
  isIntersecting: boolean,
  index: number
): React.CSSProperties => ({
  opacity: isIntersecting ? 1 : 0,
  transform: isIntersecting ? "translateY(0)" : "translateY(-10px)",
  transition: `opacity 0.6s ease-out ${
    index * 0.15
  }s, transform 0.6s ease-out ${index * 0.15}s`,
  willChange: "opacity, transform",
});

interface CardItemProps {
  content: ContentItem;
  index: number;
  isIntersecting: boolean;
}

const CardItem = ({ content, index, isIntersecting }: CardItemProps) => {
  const labelColorClass = LABEL_COLOR_CLASSES[getLabelColor(index)];
  const listColorClass = LIST_COLOR_CLASSES[getListColor(index)];

  return (
    <div
      className={styles.cardWrapper}
      style={getTransitionStyle(isIntersecting, index)}
    >
      <div className={labelColorClass}>
        <Image
          src={`/assets/svgs/${content.icon}.svg`}
          alt={content.title}
          width={100}
          height={100}
          className={styles.cardLabelIcon}
        />
        <span className={styles.cardLabelText}>{content.title}</span>
        <div className={styles.cardLabelArrow} />
      </div>
      <ul className={listColorClass}>
        {content.listItems.map((item) => (
          <li key={item.title} className={styles.listItem}>
            {item.title}
            {item.description && (
              <Fragment>
                <br />
                <span className={styles.listItemDescription}>
                  ({item.description})
                </span>
              </Fragment>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Section4 = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    once: true,
  });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span className={styles.titleHighlight}>FPMate</span> 주요 기능
          </div>
          <p className={styles.description}>
            지금 바로 아래 기능들을 활용해보세요.
          </p>
        </div>

        <div className={styles.grid}>
          {contents.map((content, index) => (
            <CardItem
              key={content.id}
              content={content}
              index={index}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4;
