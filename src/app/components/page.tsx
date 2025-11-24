"use client";

import { useState } from "react";
import { Button, Typography, Card, Input, Badge, Divider } from "@/shared/ui";

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <header className="sticky top-0 z-[100] bg-[var(--header-bg)] backdrop-blur-[var(--header-blur)] border-b border-[var(--header-border)]">
        <div className="max-w-[var(--spacing-page-max-width)] mx-auto px-[var(--spacing-page-x)] h-[var(--header-height)] flex items-center">
          <Typography variant="title2" weight="semibold">
            Design System Components
          </Typography>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[var(--spacing-page-max-width)] mx-auto px-[var(--spacing-page-x)] py-[var(--spacing-page-y)]">
        {/* Colors Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Colors
          </Typography>

          {/* Brand Colors */}
          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-4">
              Brand Colors
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <ColorSwatch
                color="var(--brand-primary)"
                name="Primary"
                hex="#00AB55"
              />
              <ColorSwatch
                color="var(--brand-tint)"
                name="Tint"
                hex="#C8FAD6"
              />
              <ColorSwatch
                color="var(--brand-hover)"
                name="Hover"
                hex="#5BE49B"
              />
              <ColorSwatch
                color="var(--accent-primary)"
                name="Accent"
                hex="#007B3D"
              />
              <ColorSwatch
                color="var(--accent-tint)"
                name="Accent Tint"
                hex="#B8E6D0"
              />
            </div>
          </Card>

          {/* Semantic Colors */}
          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-4">
              Semantic Colors
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch
                color="var(--semantic-success)"
                name="Success"
                hex="#22C55E"
              />
              <ColorSwatch
                color="var(--semantic-warning)"
                name="Warning"
                hex="#FFAB00"
              />
              <ColorSwatch
                color="var(--semantic-error)"
                name="Error"
                hex="#FF5630"
              />
              <ColorSwatch
                color="var(--semantic-info)"
                name="Info"
                hex="#00B8D9"
              />
            </div>
          </Card>

          {/* Grey Scale */}
          <Card variant="elevated">
            <Typography variant="title1" weight="semibold" className="mb-4">
              Grey Scale
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <ColorSwatch
                color="var(--grey-50)"
                name="Grey 50"
                hex="#FCFDFD"
                showBorder
              />
              <ColorSwatch
                color="var(--grey-100)"
                name="Grey 100"
                hex="#F9FAFB"
                showBorder
              />
              <ColorSwatch
                color="var(--grey-200)"
                name="Grey 200"
                hex="#F4F6F8"
                showBorder
              />
              <ColorSwatch
                color="var(--grey-300)"
                name="Grey 300"
                hex="#DFE3E8"
              />
              <ColorSwatch
                color="var(--grey-400)"
                name="Grey 400"
                hex="#C4CDD5"
              />
              <ColorSwatch
                color="var(--grey-500)"
                name="Grey 500"
                hex="#919EAB"
              />
              <ColorSwatch
                color="var(--grey-600)"
                name="Grey 600"
                hex="#637381"
              />
              <ColorSwatch
                color="var(--grey-700)"
                name="Grey 700"
                hex="#454F5B"
              />
              <ColorSwatch
                color="var(--grey-800)"
                name="Grey 800"
                hex="#1C252E"
              />
              <ColorSwatch
                color="var(--grey-900)"
                name="Grey 900"
                hex="#141A21"
              />
            </div>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Typography
          </Typography>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Titles (rem과 px 표시)
            </Typography>
            <div className="space-y-4">
              <Typography variant="title9" showConversion>
                Title 9 - Display Large
              </Typography>
              <Typography variant="title8" showConversion>
                Title 8 - Display Medium
              </Typography>
              <Typography variant="title7" showConversion>
                Title 7 - Display Small
              </Typography>
              <Typography variant="title6" showConversion>
                Title 6 - Heading XL
              </Typography>
              <Typography variant="title5" showConversion>
                Title 5 - Heading Large
              </Typography>
              <Typography variant="title4" showConversion>
                Title 4 - Heading Medium
              </Typography>
              <Typography variant="title3" showConversion>
                Title 3 - Heading Small
              </Typography>
              <Typography variant="title2" showConversion>
                Title 2 - Heading XS
              </Typography>
              <Typography variant="title1" showConversion>
                Title 1 - Heading Mini
              </Typography>
            </div>
          </Card>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Body Text (rem과 px 표시)
            </Typography>
            <div className="space-y-4">
              <Typography variant="large" showConversion>
                Large - 큰 본문 텍스트입니다. 중요한 내용을 강조할 때
                사용합니다.
              </Typography>
              <Typography variant="regular" showConversion>
                Regular - 일반 본문 텍스트입니다. 기본적으로 가장 많이 사용되는
                크기입니다.
              </Typography>
              <Typography variant="small" showConversion>
                Small - 작은 본문 텍스트입니다. 부가 설명이나 보조 정보에
                사용합니다.
              </Typography>
              <Typography variant="mini" showConversion>
                Mini - 매우 작은 텍스트입니다. 라벨이나 메타 정보에 사용합니다.
              </Typography>
              <Typography variant="micro" showConversion>
                Micro - 최소 크기 텍스트입니다. 각주나 캡션에 사용합니다.
              </Typography>
            </div>
          </Card>

          <Card variant="elevated">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Font Weights
            </Typography>
            <div className="space-y-3">
              <Typography variant="regular" weight="light">
                Light (300) - 가벼운 텍스트
              </Typography>
              <Typography variant="regular" weight="normal">
                Normal (400) - 일반 텍스트
              </Typography>
              <Typography variant="regular" weight="medium">
                Medium (500) - 중간 텍스트
              </Typography>
              <Typography variant="regular" weight="semibold">
                Semibold (600) - 약간 굵은 텍스트
              </Typography>
              <Typography variant="regular" weight="bold">
                Bold (680) - 굵은 텍스트
              </Typography>
            </div>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Buttons
          </Typography>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Variants
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </Card>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Sizes
            </Typography>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              States
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Button>Normal</Button>
              <Button loading={loading} onClick={handleLoadingClick}>
                {loading ? "Loading..." : "Click to Load"}
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </Card>

          <Card variant="elevated">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Full Width
            </Typography>
            <Button fullWidth>Full Width Button</Button>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Inputs
          </Typography>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Sizes
            </Typography>
            <div className="space-y-4 max-w-md">
              <Input size="sm" placeholder="Small input" />
              <Input size="md" placeholder="Medium input" />
              <Input size="lg" placeholder="Large input" />
            </div>
          </Card>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              With Label & Helper Text
            </Typography>
            <div className="space-y-4 max-w-md">
              <Input
                label="이메일"
                placeholder="your@email.com"
                helperText="이메일 주소를 입력해주세요"
                type="email"
              />
              <Input
                label="비밀번호"
                placeholder="••••••••"
                helperText="8자 이상 입력해주세요"
                type="password"
                required
              />
            </div>
          </Card>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              States
            </Typography>
            <div className="space-y-4 max-w-md">
              <Input
                placeholder="Normal state"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="에러 상태"
                placeholder="잘못된 입력"
                error
                errorMessage="올바른 형식이 아닙니다"
              />
              <Input
                label="성공 상태"
                placeholder="올바른 입력"
                success
                helperText="올바른 형식입니다"
              />
              <Input placeholder="Disabled state" disabled />
            </div>
          </Card>

          <Card variant="elevated">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Full Width
            </Typography>
            <Input fullWidth placeholder="Full width input" />
          </Card>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Cards
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card variant="default">
              <Typography variant="title1" weight="semibold" className="mb-2">
                Default Card
              </Typography>
              <Typography variant="small" color="secondary">
                기본 카드 스타일입니다.
              </Typography>
            </Card>

            <Card variant="bordered">
              <Typography variant="title1" weight="semibold" className="mb-2">
                Bordered Card
              </Typography>
              <Typography variant="small" color="secondary">
                테두리가 있는 카드입니다.
              </Typography>
            </Card>

            <Card variant="elevated">
              <Typography variant="title1" weight="semibold" className="mb-2">
                Elevated Card
              </Typography>
              <Typography variant="small" color="secondary">
                그림자가 있는 카드입니다.
              </Typography>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card variant="elevated" hoverable>
              <Typography variant="title1" weight="semibold" className="mb-2">
                Hoverable Card
              </Typography>
              <Typography variant="small" color="secondary">
                마우스를 올리면 그림자가 진해집니다.
              </Typography>
            </Card>

            <Card variant="elevated" clickable>
              <Typography variant="title1" weight="semibold" className="mb-2">
                Clickable Card
              </Typography>
              <Typography variant="small" color="secondary">
                클릭 가능한 카드입니다. 클릭하면 축소 효과가 있습니다.
              </Typography>
            </Card>
          </div>

          <Card variant="elevated" padding="none">
            <div className="p-6 bg-bg-secondary">
              <Typography variant="title1" weight="semibold">
                Custom Padding
              </Typography>
            </div>
            <div className="p-6">
              <Typography variant="small" color="secondary">
                padding=&apos;none&apos;으로 설정하고 내부에서 커스텀 패딩을
                적용할 수 있습니다.
              </Typography>
            </div>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Badges
          </Typography>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Variants
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </Card>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Sizes
            </Typography>
            <div className="flex flex-wrap items-center gap-3">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </Card>

          <Card variant="elevated">
            <Typography variant="title1" weight="semibold" className="mb-6">
              With Dot
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Badge dot>Default</Badge>
              <Badge variant="primary" dot>
                Primary
              </Badge>
              <Badge variant="success" dot>
                Success
              </Badge>
              <Badge variant="warning" dot>
                Warning
              </Badge>
              <Badge variant="error" dot>
                Error
              </Badge>
              <Badge variant="info" dot>
                Info
              </Badge>
            </div>
          </Card>
        </section>

        {/* Dividers Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Dividers
          </Typography>

          <Card variant="elevated" className="mb-8">
            <Typography variant="title1" weight="semibold">
              위 섹션
            </Typography>
            <Divider spacing="md" />
            <Typography variant="title1" weight="semibold">
              아래 섹션
            </Typography>
          </Card>

          <Card variant="elevated">
            <Typography variant="title1" weight="semibold" className="mb-6">
              Vertical Divider
            </Typography>
            <div className="flex items-center h-20">
              <Typography variant="regular">Left Content</Typography>
              <Divider orientation="vertical" spacing="md" />
              <Typography variant="regular">Right Content</Typography>
            </div>
          </Card>
        </section>

        {/* Shadows Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Shadows
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-bg-paper rounded-lg shadow-[var(--shadow-tiny)]">
              <Typography variant="title1" weight="semibold" className="mb-2">
                Tiny Shadow
              </Typography>
              <Typography variant="small" color="secondary">
                0 1px 2px 0 rgba(145, 158, 171, 0.16)
              </Typography>
            </div>

            <div className="p-6 bg-bg-paper rounded-lg shadow-[var(--shadow-low)]">
              <Typography variant="title1" weight="semibold" className="mb-2">
                Low Shadow
              </Typography>
              <Typography variant="small" color="secondary">
                0px 2px 4px rgba(145, 158, 171, 0.2)
              </Typography>
            </div>

            <div className="p-6 bg-bg-paper rounded-lg shadow-[var(--shadow-medium)]">
              <Typography variant="title1" weight="semibold" className="mb-2">
                Medium Shadow
              </Typography>
              <Typography variant="small" color="secondary">
                0px 4px 24px rgba(145, 158, 171, 0.2)
              </Typography>
            </div>

            <div className="p-6 bg-bg-paper rounded-lg shadow-[var(--shadow-high)]">
              <Typography variant="title1" weight="semibold" className="mb-2">
                High Shadow
              </Typography>
              <Typography variant="small" color="secondary">
                0px 7px 32px rgba(145, 158, 171, 0.35)
              </Typography>
            </div>

            <div className="p-6 bg-bg-paper rounded-lg shadow-[var(--shadow-card)]">
              <Typography variant="title1" weight="semibold" className="mb-2">
                Card Shadow
              </Typography>
              <Typography variant="small" color="secondary">
                카드 전용 그림자
              </Typography>
            </div>

            <div className="p-6 bg-bg-paper rounded-lg shadow-[var(--shadow-dropdown)]">
              <Typography variant="title1" weight="semibold" className="mb-2">
                Dropdown Shadow
              </Typography>
              <Typography variant="small" color="secondary">
                드롭다운 전용 그림자
              </Typography>
            </div>
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="mb-16">
          <Typography variant="title3" weight="semibold" className="mb-6">
            Border Radius
          </Typography>

          <Card variant="elevated">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="w-full h-20 bg-brand-tint rounded-[var(--radius-sm)] mb-2" />
                <Typography variant="small" weight="semibold">
                  Small (4px)
                </Typography>
              </div>
              <div>
                <div className="w-full h-20 bg-brand-tint rounded-[var(--radius-md)] mb-2" />
                <Typography variant="small" weight="semibold">
                  Medium (8px)
                </Typography>
              </div>
              <div>
                <div className="w-full h-20 bg-brand-tint rounded-[var(--radius-lg)] mb-2" />
                <Typography variant="small" weight="semibold">
                  Large (12px)
                </Typography>
              </div>
              <div>
                <div className="w-full h-20 bg-brand-tint rounded-[var(--radius-xl)] mb-2" />
                <Typography variant="small" weight="semibold">
                  XL (16px)
                </Typography>
              </div>
              <div>
                <div className="w-full h-20 bg-brand-tint rounded-[var(--radius-2xl)] mb-2" />
                <Typography variant="small" weight="semibold">
                  2XL (24px)
                </Typography>
              </div>
              <div>
                <div className="w-full h-20 bg-brand-tint rounded-[var(--radius-3xl)] mb-2" />
                <Typography variant="small" weight="semibold">
                  3XL (32px)
                </Typography>
              </div>
              <div>
                <div className="w-full h-20 bg-brand-tint rounded-[var(--radius-full)] mb-2" />
                <Typography variant="small" weight="semibold">
                  Full (9999px)
                </Typography>
              </div>
            </div>
          </Card>
        </section>

        {/* Complex Example Section */}
        <section>
          <Typography variant="title3" weight="semibold" className="mb-6">
            Combined Example
          </Typography>

          <Card variant="elevated" hoverable>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Typography variant="title2" weight="semibold">
                    프로젝트 카드 예시
                  </Typography>
                  <Badge variant="success" dot>
                    Active
                  </Badge>
                </div>
                <Typography variant="small" color="secondary">
                  여러 컴포넌트를 조합한 실제 사용 예시입니다.
                </Typography>
              </div>
              <Badge variant="primary">New</Badge>
            </div>

            <Divider spacing="md" />

            <div className="space-y-4">
              <Input
                label="프로젝트 이름"
                placeholder="프로젝트 이름을 입력하세요"
                fullWidth
              />
              <Input
                label="설명"
                placeholder="프로젝트 설명을 입력하세요"
                fullWidth
              />
            </div>

            <Divider spacing="md" />

            <div className="flex justify-end gap-3">
              <Button variant="ghost">취소</Button>
              <Button variant="primary">저장</Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
  showBorder?: boolean;
}

function ColorSwatch({
  color,
  name,
  hex,
  showBorder = false,
}: ColorSwatchProps) {
  return (
    <div>
      <div
        className={`w-full h-16 rounded-lg mb-2 ${
          showBorder ? "border-2 border-border-primary" : ""
        }`}
        style={{ backgroundColor: color }}
      />
      <Typography variant="small" weight="semibold" className="mb-0.5">
        {name}
      </Typography>
      <Typography variant="micro" color="secondary" className="font-mono">
        {hex}
      </Typography>
    </div>
  );
}
