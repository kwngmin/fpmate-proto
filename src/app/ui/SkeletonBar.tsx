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
      className={`${isRound ? "rounded-full" : "rounded"} ${
        emphasize ? "bg-gray-300" : "bg-gray-200"
      } animate-pulse shrink-0`}
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
};

export default SkeletonBar;
