import { Card } from "@/shared/ui";
import InsightCard from "@/shared/ui/InsightCard";
import SkeletonBar from "./SkeletonBar";
import styles from "./Section2.module.css";

interface CardChip {
  id: number;
  label: string;
  color: string;
}

interface CardData {
  id: number;
  chips: CardChip[];
  title: string;
  description: string;
  fp: number;
  amount: number;
  date: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    chips: [
      { id: 1, label: "신규", color: "red" },
      { id: 2, label: "금융", color: "blue" },
      { id: 3, label: "사업 기획", color: "green" },
    ],
    title: "클라우드 시스템 도입 및 구축",
    description: "클라우드 시스템 도입 및 구축",
    fp: 495.6,
    amount: 384576128,
    date: "2025.10.20",
  },
  {
    id: 2,
    chips: [
      { id: 1, label: "신규", color: "red" },
      { id: 2, label: "간이법", color: "blue" },
      { id: 3, label: "개발 테스트", color: "green" },
    ],
    title: "대금 결제 APP 구축",
    description: "대금 결제 APP 구축",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
  },
  {
    id: 3,
    chips: [
      { id: 1, label: "금융", color: "blue" },
      { id: 2, label: "프로젝트 종료", color: "green" },
    ],
    title: "소프트웨어 비용 산정 솔루션 구축",
    description: "소프트웨어 비용 산정 솔루션 구축",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
  },
];

interface DummyCardSkeletonConfig {
  chips: Array<{ width: number; height: number }>;
  content: Array<{ width: number; height: number }>;
  hasShrinkActions?: boolean;
}

const dummyCardConfigs: DummyCardSkeletonConfig[] = [
  {
    chips: [
      { width: 3, height: 2.25 },
      { width: 3.5, height: 2.25 },
      { width: 5, height: 2.25 },
    ],
    content: [
      { width: 3.5, height: 1.25 },
      { width: 8, height: 1.25 },
      { width: 4, height: 1.25 },
    ],
  },
  {
    chips: [
      { width: 3, height: 2.25 },
      { width: 3.5, height: 2.25 },
      { width: 5, height: 2.25 },
    ],
    content: [
      { width: 4, height: 1.25 },
      { width: 2.5, height: 1.25 },
      { width: 4, height: 1.25 },
      { width: 3, height: 1.25 },
    ],
    hasShrinkActions: true,
  },
  {
    chips: [
      { width: 3, height: 2.25 },
      { width: 3.5, height: 2.25 },
      { width: 5, height: 2.25 },
    ],
    content: [
      { width: 4, height: 1.25 },
      { width: 2, height: 1.25 },
      { width: 3, height: 1.25 },
    ],
  },
];

const DummyCard = ({ config }: { config: DummyCardSkeletonConfig }) => (
  <Card variant="bordered" padding="sm" className={styles.dummyCard}>
    <div className={styles.dummyCardHeader}>
      <div className={styles.dummyCardChips}>
        {config.chips.map((chip, index) => (
          <SkeletonBar
            key={index}
            width={chip.width}
            height={chip.height}
            isRound
          />
        ))}
      </div>
      <div
        className={
          config.hasShrinkActions
            ? styles.dummyCardActionsShrink
            : styles.dummyCardActions
        }
      >
        <SkeletonBar width={2.25} height={2.25} isRound />
        <SkeletonBar width={2.25} height={2.25} isRound />
      </div>
    </div>

    <div className={styles.dummyCardContent}>
      {config.content.map((item, index) => (
        <SkeletonBar key={index} width={item.width} height={item.height} />
      ))}
    </div>
  </Card>
);

const Section2 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            SW 사업 추진{" "}
            <span className={styles.titleHighlight}>인사이트+</span>
          </div>
          <p className={styles.description}>
            <span className={styles.fontSemibold}>고유 작업 공간</span>에서
            그동안 작업했던 <br />
            <span className={styles.fontSemibold}>SW 사업 비용 산정 내역</span>
            을 한눈에 파악해보세요.
          </p>
        </div>

        <div className={styles.cardContainer}>
          <div className={styles.insightCardsGrid}>
            {cardData.map((card, index) => (
              <InsightCard key={card.id} {...card} cardIndex={index + 1} />
            ))}
          </div>

          <div className={styles.dummyCardsGrid}>
            {dummyCardConfigs.map((config, index) => (
              <DummyCard key={index} config={config} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
