"use client";

import { ConnectionPath } from "@/shared/ui/ConnectionPath";
import styles from "./ConnectionLines.module.css";

type CardPosition = 1 | 2 | 3;
type FeaturePosition = 1 | 2 | 3 | 4;

const CARD_POSITIONS: Record<CardPosition, string> = {
  1: "16.666%",
  2: "50%",
  3: "83.333%",
};

const FEATURE_POSITIONS: Record<FeaturePosition, string> = {
  1: "12.5%",
  2: "37.5%",
  3: "62.5%",
  4: "87.5%",
};

interface ConnectionConfig {
  startCard: CardPosition;
  endFeature: FeaturePosition;
  delay: number;
}

const CONNECTION_CONFIGS: ConnectionConfig[] = [
  { startCard: 1, endFeature: 1, delay: 0 },
  { startCard: 1, endFeature: 3, delay: 0.6 },
  { startCard: 2, endFeature: 2, delay: 1.5 },
  { startCard: 2, endFeature: 3, delay: 2.1 },
  { startCard: 2, endFeature: 4, delay: 2.7 },
  { startCard: 3, endFeature: 2, delay: 3.5 },
  { startCard: 3, endFeature: 3, delay: 4.1 },
];

const ConnectionLines = () => {
  return (
    <div className={styles.container}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={styles.svg}
      >
        {CONNECTION_CONFIGS.map((config, index) => (
          <ConnectionPath
            key={index}
            startX={CARD_POSITIONS[config.startCard]}
            endX={FEATURE_POSITIONS[config.endFeature]}
            delay={config.delay}
          />
        ))}
      </svg>
    </div>
  );
};

export default ConnectionLines;
