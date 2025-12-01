import { Card } from "./Card";
import InsightCard from "./InsightCard";
import styles from "./Section2.module.css";
import SkeletonBar from "./SkeletonBar";

const cardData = [
  {
    id: 1,
    chips: [
      {
        id: 1,
        label: "신규",
        color: "red",
      },
      {
        id: 2,
        label: "금융",
        color: "blue",
      },
      {
        id: 3,
        label: "사업 기획",
        color: "green",
      },
    ],
    title: "클라우드 시스템 도입 및 구축",
    description: "클라우드 시스템 도입 및 구축",
    fp: 495.6,
    amount: 384576128,
    date: "2025.10.20",
    managerImage: "/assets/images/avatar-1.png",
  },
  {
    id: 2,
    chips: [
      {
        id: 1,
        label: "신규",
        color: "red",
      },
      {
        id: 2,
        label: "간이법",
        color: "blue",
      },
      {
        id: 3,
        label: "개발 테스트",
        color: "green",
      },
    ],
    title: "대금 결제 APP 구축",
    description: "대금 결제 APP 구축",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
    managerImage: "/assets/images/avatar-2.png",
  },
  {
    id: 3,
    chips: [
      {
        id: 1,
        label: "금융",
        color: "blue",
      },
      {
        id: 2,
        label: "프로젝트 종료",
        color: "green",
      },
    ],
    title: "소프트웨어 비용 산정 솔루션 구축",
    description: "소프트웨어 비용 산정 솔루션 구축",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
    managerImage: "/assets/images/avatar-3.png",
  },
];

const Section2 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            SW 사업 추진 <span className={styles.brandText}>인사이트+</span>
          </div>
          <p className={styles.description}>
            <span className={styles.semibold}>고유 작업 공간</span>에서 그동안
            작업했던 <br />
            <span className={styles.semibold}>SW 사업 비용 산정 내역</span>을
            한눈에 파악해보세요.
          </p>
        </div>

        {/* card container */}
        <div className={styles.cardContainer}>
          {/* Insight Cards */}
          <div className={styles.insightCards}>
            {cardData.map((card) => (
              <InsightCard key={card.id} {...card} isFirst={card.id === 1} />
            ))}
          </div>

          {/* Dummy cards */}
          <div className={styles.dummyCards}>
            <Card variant="bordered" padding="sm" className={styles.dummyCard}>
              <div className={styles.dummyCardHeader}>
                <div className={styles.dummyChips}>
                  <SkeletonBar width={3} height={2.25} isRound />
                  <SkeletonBar width={3.5} height={2.25} isRound />
                  <SkeletonBar width={5} height={2.25} isRound />
                </div>
                <div className={styles.dummyActions}>
                  <SkeletonBar width={2.25} height={2.25} isRound />
                  <SkeletonBar width={2.25} height={2.25} isRound />
                </div>
              </div>

              <div className={styles.dummyContent}>
                <SkeletonBar width={3.5} height={1} />
                <SkeletonBar width={7} height={1} />
                <SkeletonBar width={8} height={1} />
              </div>
            </Card>
            <Card variant="bordered" padding="sm" className={styles.dummyCard}>
              <div className={styles.dummyCardHeader}>
                <div className={styles.dummyChips}>
                  <SkeletonBar width={3} height={2.25} isRound />
                  <SkeletonBar width={3.5} height={2.25} isRound />
                  <SkeletonBar width={5} height={2.25} isRound />
                </div>
                <div
                  className={`${styles.dummyActions} ${styles.dummyActionsShrink}`}
                >
                  <SkeletonBar width={2.25} height={2.25} isRound />
                  <SkeletonBar width={2.25} height={2.25} isRound />
                </div>
              </div>

              <div className={styles.dummyContent}>
                <SkeletonBar width={2.5} height={1} />
                <SkeletonBar width={5} height={1} />
                <SkeletonBar width={3} height={1} />
              </div>
            </Card>
            <Card variant="bordered" padding="sm" className={styles.dummyCard}>
              <div className={styles.dummyCardHeader}>
                <div className={styles.dummyChips}>
                  <SkeletonBar width={3} height={2.25} isRound />
                  <SkeletonBar width={3.5} height={2.25} isRound />
                  <SkeletonBar width={5} height={2.25} isRound />
                </div>
                <div className={styles.dummyActions}>
                  <SkeletonBar width={2.25} height={2.25} isRound />
                  <SkeletonBar width={2.25} height={2.25} isRound />
                </div>
              </div>

              <div className={styles.dummyContent}>
                <SkeletonBar width={2.5} height={1} />
                <SkeletonBar width={5} height={1} />
                <SkeletonBar width={3} height={1} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
