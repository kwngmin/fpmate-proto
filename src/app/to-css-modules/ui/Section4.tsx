import Image from "next/image";
import { Fragment } from "react";
import styles from "./Section4.module.css";

/**
 * Section 4 서비스 카드 데이터
 */
const Contents = [
  {
    id: 1,
    key: "ai-recommendation",
    title: "AI 추천 기능",
    icon: "robot",
    listItems: [
      {
        title: "업무 및 기능 식별 자동화",
        description: "업무 및 기능 추천",
      },
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
      {
        title: "산정 유형에 따른 기능 점수 자동 계산",
        description: null,
      },
      {
        title: "업무별 기능 점수 합계 자동 계산",
        description: null,
      },
      {
        title: "FP 측정 결과 즉시 확인",
        description: null,
      },
      {
        title: "FP 기반 SW 사업비용 산정",
        description: null,
      },
    ],
  },
  {
    id: 3,
    key: "data-verification",
    title: "데이터 검증",
    icon: "list-checks",
    listItems: [
      {
        title: "중복검사",
        description: null,
      },
      {
        title: "명칭 오류 검사",
        description: null,
      },
      {
        title: "속성 미작성 검사",
        description: null,
      },
      {
        title: "기능 유형 판단 오류 검증",
        description: null,
      },
    ],
  },
  {
    id: 4,
    key: "guidance",
    title: "오류 수정 가이드",
    icon: "warning",
    listItems: [
      {
        title: "오류 유형별 수정 가이드",
        description: null,
      },
      {
        title: "확인 필요 사항에 대한 쉬운 탐색",
        description: null,
      },
      {
        title: "정확한 산정 유도",
        description: null,
      },
    ],
  },
  {
    id: 5,
    key: "report",
    title: "산정결과 리포트",
    icon: "newspaper",
    listItems: [
      {
        title: "산정 내역 축척",
        description: null,
      },
      {
        title: "산정 내역 접근 권한 관리",
        description: null,
      },
      {
        title: "비용 산정 진행 관리",
        description: null,
      },
      {
        title: "산정 보고서",
        description: null,
      },
      {
        title: "산정 내역 분석",
        description: null,
      },
    ],
  },
  {
    id: 6,
    key: "data-utilization",
    title: "데이터 활용",
    icon: "database",
    listItems: [
      {
        title: "산정 결과 재활용",
        description: null,
      },
      {
        title: "산정 데이터를 활용한 추천",
        description: null,
      },
      {
        title: "산정 결과 통계 및 시각화",
        description: null,
      },
      {
        title: "산정결과 비교 기능 제공",
        description: null,
      },
      {
        title: "경영 인사이트 제공",
        description: null,
      },
    ],
  },
];

const Section4 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span className={styles.brandText}>FPMate</span>{" "}
            주요 기능
          </div>

          {/* icons */}
          <div className={styles.icons}>
            {Contents.map((content) => (
              <div
                key={content.id}
                className={styles.iconWrapper}
              >
                <Image
                  src={`/assets/svgs/${content.icon}.svg`}
                  alt={content.title}
                  width={100}
                  height={100}
                  className={styles.icon}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {Contents.map((content, index) => {
            const labelColor =
              (index + 1) % 3 === 0
                ? styles.labelGreen
                : (index + 1) % 3 === 1
                ? styles.labelLime
                : styles.labelTeal;

            const containerColor =
              (index + 1) % 2 === 0 ? styles.contentSlate : styles.contentStone;

            return (
              <div
                className={styles.card}
                key={content.id}
              >
                <div
                  className={`${styles.cardLabel} ${labelColor}`}
                >
                  {content.title}
                  <div
                    className={styles.cardLabelArrow}
                  />
                </div>
                <ul
                  className={`${styles.cardContent} ${containerColor}`}
                >
                  {content.listItems.map((item) => (
                    <li
                      key={item.title}
                      className={styles.listItem}
                    >
                      {item.title}
                      {item?.description && (
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
          })}
        </div>
      </div>
    </section>
  );
};

export default Section4;

