const SkeletonBar = ({
  width,
  height = 7,
  isRound = false,
}: {
  width: number;
  height?: number;
  isRound?: boolean;
}) => {
  return (
    <div
      className={`${
        isRound ? "rounded-full" : "rounded"
      } bg-gray-200 animate-pulse shrink-0`}
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
};

export default SkeletonBar;
