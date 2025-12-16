"use client";

import { useIntersectionObserver } from "@/shared/lib/use-intersection-observer";
import { Card } from "@/shared/ui";
import ConnectionLines from "@/shared/ui/ConnectionLines";
import { FadeDiv, FadeText } from "@/shared/ui/FadeMotion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Section1.module.css";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface SectionContent {
  id: number;
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    title: "신규 개발",
    description: "초기 개발 규모 산정의 정확도 향상",
    icon: "magic-wand",
  },
  {
    title: "유지보수",
    description: "변경개선 요청에 대한 업무량 산정의 객관성과 신뢰도 향상",
    icon: "toolbox",
  },
  {
    title: "발주사",
    description: "견적 비교와 기능점수 검증에 효과적으로 대응",
    icon: "building-office",
  },
  {
    title: "개발사",
    description: "견적제안서 작성에 필요한 기능점수 기반 근거 자료 자동 생성",
    icon: "code",
  },
];

const section1Contents: SectionContent[] = [
  {
    id: 1,
    title: "SW 사업을 기획하고 계신가요?",
    description: "FPMate에서 필요한 비용을 알아보세요.",
    image: "/assets/images/section1-lamp.png",
  },
  {
    id: 2,
    title: "SW 사업을 진행하고 계신가요?",
    description: "FPMate로 프로젝트의 비용을 추척해보세요.",
    image: "/assets/images/section1-play.png",
  },
  {
    id: 3,
    title: "SW 사업이 완료되셨나요?",
    description: "FPMate로 운영에 필요한 비용을 알아보세요.",
    image: "/assets/images/section1-check.png",
  },
];

const SECTION1_CARD_WIDTH = 288;
const SECTION1_CARD_GAP = 8;
const CONTAINER_PADDING = 48;
const MOBILE_BREAKPOINT = 1024;

const Section1 = () => {
  const [section1Step, setSection1Step] = useState<number>(1);
  const [section1ContainerWidth, setSection1ContainerWidth] =
    useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const section1ContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsMobile(width <= MOBILE_BREAKPOINT);

      if (section1ContainerRef.current) {
        setSection1ContainerWidth(section1ContainerRef.current.clientWidth);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const section1TranslateX = useMemo(() => {
    if (!isMobile || section1ContainerWidth === 0) return 0;

    const visibleWidth = section1ContainerWidth - CONTAINER_PADDING;
    const totalCards = section1Contents.length;
    const carouselWidth =
      totalCards * SECTION1_CARD_WIDTH + (totalCards - 1) * SECTION1_CARD_GAP;

    if (section1Step === 1) {
      return 0;
    } else if (section1Step === 2) {
      const cardLeftPosition = SECTION1_CARD_WIDTH + SECTION1_CARD_GAP;
      const cardCenter = cardLeftPosition + SECTION1_CARD_WIDTH / 2;
      const containerCenter = visibleWidth / 2;
      return cardCenter - containerCenter;
    } else {
      return carouselWidth - visibleWidth;
    }
  }, [section1Step, section1ContainerWidth, isMobile]);

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  const handleCardClick = useCallback(
    (contentId: number) => {
      if (isMobile) {
        setSection1Step(contentId);
      }
    },
    [isMobile]
  );

  const handlePrevClick = useCallback(() => {
    if (section1Step > 1) {
      setSection1Step(section1Step - 1);
    }
  }, [section1Step]);

  const handleNextClick = useCallback(() => {
    if (section1Step < section1Contents.length) {
      setSection1Step(section1Step + 1);
    }
  }, [section1Step]);

  const getCardClassName = useCallback(
    (contentId: number): string => {
      if (!isMobile) return styles.card;

      if (contentId === section1Step) {
        return styles.cardMobileActive;
      }
      return styles.cardMobileInactive;
    },
    [isMobile, section1Step]
  );

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.headerContainer}>
        <p className={styles.headerText}>
          어떤 사업이든,{" "}
          <span className={styles.fontSemibold}>더 정확하게. </span>
          <br className={styles.hiddenSmUp} />
          어떤 역할이든,{" "}
          <span className={styles.fontSemibold}>더 효율적으로. </span>
        </p>
      </div>

      <div>
        <div className={styles.carouselWrapper}>
          <div
            ref={section1ContainerRef}
            className={styles.carouselContainer}
            style={{
              perspective: isMobile ? "1000px" : "none",
            }}
          >
            <div
              className={styles.carouselGrid}
              style={{
                transform: isMobile
                  ? `translateX(-${section1TranslateX}px)`
                  : "none",
                width: isMobile ? "max-content" : "auto",
                transformStyle: "preserve-3d",
              }}
            >
              {section1Contents.map((content, index) => (
                <Card
                  key={content.id}
                  padding="none"
                  className={getCardClassName(content.id)}
                  onClick={() => handleCardClick(content.id)}
                >
                  <div className={styles.cardContent}>
                    <FadeDiv
                      intersectionOptions={{
                        threshold: 0.5,
                      }}
                      delay={index * 200}
                      hasBlur={false}
                      useIntersection={!isMobile}
                    >
                      <Image
                        src={content.image}
                        alt={`section1-${content.id}`}
                        width={124}
                        height={124}
                        className={styles.cardImage}
                      />
                    </FadeDiv>

                    <FadeText
                      className={styles.cardTitle}
                      text={content.title}
                      hasBlur={false}
                      useIntersection={!isMobile}
                      intersectionOptions={{
                        threshold: 0.5,
                      }}
                      delay={index * 200 + 100}
                    />

                    <FadeText
                      className={styles.cardDescription}
                      text={content.description}
                      hasBlur={false}
                      useIntersection={!isMobile}
                      intersectionOptions={{
                        threshold: 0.5,
                      }}
                      delay={index * 200 + 200}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div className={styles.navButtonContainer}>
              <button
                type="button"
                onClick={handlePrevClick}
                className={
                  section1Step > 1
                    ? styles.navButtonEnabled
                    : styles.navButtonDisabled
                }
              >
                <Image
                  src="/assets/svgs/caret-left.svg"
                  alt="caret-left"
                  width={24}
                  height={24}
                  className={styles.navButtonIcon}
                />
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                className={
                  section1Step < section1Contents.length
                    ? styles.navButtonEnabled
                    : styles.navButtonDisabled
                }
              >
                <Image
                  src="/assets/svgs/caret-right.svg"
                  alt="caret-right"
                  width={24}
                  height={24}
                  className={styles.navButtonIcon}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.connectionLinesWrapper}>
          <ConnectionLines />
        </div>

        <div className={styles.featuresContainer}>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <FadeDiv
                intersectionOptions={{
                  threshold: 0.5,
                }}
                useIntersection={true}
                delay={index * 100}
                key={feature.title}
                className={styles.featureItem}
              >
                <div className={styles.featureTitle}>
                  <Image
                    src={`/assets/svgs/${feature.icon}.svg`}
                    alt={feature.title}
                    width={16}
                    height={16}
                    className={styles.featureIcon}
                  />
                  {feature.title}
                </div>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </FadeDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
