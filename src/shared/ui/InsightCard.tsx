import { Badge } from "./Badge";
import { Card } from "./Card";

const InsightCard = () => {
  return (
    <Card
      variant="bordered"
      hoverable
      padding="sm"
      className="flex flex-col gap-3 hover:translate-y-[-4px]"
    >
      <div className="flex justify-between gap-2">
        <div className="flex gap-1">
          <Badge>신규</Badge>
          <Badge>간이법</Badge>
          <Badge>프로젝트 계획</Badge>
        </div>
        <div className="flex gap-2 items-center">
          <div className="size-7 bg-gray-100 rounded-full" />
          <div className="size-7 bg-gray-100 rounded-full" />
        </div>
      </div>

      {/* 프로젝트 정보 */}
      <div className="flex flex-col">
        <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold">
          모바일 플랫폼 구현
        </span>
        <span className="text-[0.9375rem] leading-[1.6] tracking-[-0.011em]">
          모바일 플랫폼 구현 FP
        </span>
      </div>

      {/* 내역 */}
      <div className="flex flex-col">
        <div className="flex justify-between gap-2">
          <span className="text-[0.875rem] leading-normal tracking-[-0.013em] font-medium">
            총 기능 점수
          </span>
          <span className="text-[0.9375rem] leading-[1.6] tracking-[-0.011em]">
            <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-bold mr-2">
              1,000.6
            </span>
            FP
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-[0.875rem] leading-normal tracking-[-0.013em] font-medium">
            소프트웨어 개발비
          </span>
          <span className="text-[0.9375rem] leading-[1.6] tracking-[-0.011em]">
            <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-bold mr-2">
              473,798,508
            </span>
            원
          </span>
        </div>
      </div>

      <div className="flex justify-end items-center gap-2">
        <span className="text-[0.875rem] tracking-[-0.013em]">
          선정완료일: 2023.06.20 담당자:
        </span>{" "}
        <div className="size-7 bg-gray-200 rounded-full" />
      </div>
    </Card>
  );
};

export default InsightCard;
