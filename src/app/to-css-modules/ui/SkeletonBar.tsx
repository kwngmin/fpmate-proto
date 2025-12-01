import styles from "./SkeletonBar.module.css";

/**
 * SkeletonBar 컴포넌트 - 로딩 스켈레톤 바
 * @param width - rem 단위의 너비
 * @param height - rem 단위의 높이 (기본값: 7)
 * @param isRound - 완전히 둥근 모서리 여부
 * @param emphasize - 강조 색상 사용 여부
 * @returns SkeletonBar 컴포넌트
 */
const SkeletonBar = ({
  width,
  height = 7,
  isRound = false,
  emphasize = false,
}: {
  width: number;
  height?: number;
  isRound?: boolean;
  emphasize?: boolean;
}) => {
  return (
    <div
      className={`${styles.skeletonBar} ${
        isRound ? styles.roundedFull : styles.rounded
      } ${emphasize ? styles.emphasize : styles.normal}`}
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
};

export default SkeletonBar;
