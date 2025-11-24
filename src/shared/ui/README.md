# 공유 UI 컴포넌트

프로젝트 전반에서 재사용 가능한 UI 컴포넌트 라이브러리입니다.

## 컴포넌트 목록

### Button
재사용 가능한 버튼 컴포넌트

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean

**사용 예시:**
```tsx
import { Button } from '@/shared/ui';

<Button variant="primary" size="md">클릭</Button>
<Button variant="outline" fullWidth>전체 너비 버튼</Button>
<Button loading>로딩 중...</Button>
```

---

### Typography
타이포그래피 컴포넌트 (rem/px 변환 표시 기능 포함)

**Props:**
- `variant`: 'title1' ~ 'title9' | 'large' | 'regular' | 'small' | 'mini' | 'micro'
- `as`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
- `weight`: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
- `color`: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'disabled' | 'brand' | 'error' | 'success' | 'warning' | 'info'
- `align`: 'left' | 'center' | 'right' | 'justify'
- `showConversion`: boolean (rem/px 변환 표시)

**사용 예시:**
```tsx
import { Typography } from '@/shared/ui';

<Typography variant="title1" weight="semibold">제목</Typography>
<Typography variant="regular" color="secondary">본문 텍스트</Typography>
<Typography variant="small" showConversion>크기 정보 표시</Typography>
```

---

### Card
카드 컨테이너 컴포넌트

**Props:**
- `variant`: 'default' | 'bordered' | 'elevated'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean
- `clickable`: boolean

**사용 예시:**
```tsx
import { Card } from '@/shared/ui';

<Card variant="elevated" padding="md">
  <h2>카드 제목</h2>
  <p>카드 내용</p>
</Card>

<Card variant="bordered" hoverable clickable>
  인터랙티브 카드
</Card>
```

---

### Input
입력 필드 컴포넌트

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `error`: boolean
- `success`: boolean
- `label`: string
- `helperText`: string
- `errorMessage`: string
- `fullWidth`: boolean

**사용 예시:**
```tsx
import { Input } from '@/shared/ui';

<Input
  label="이메일"
  placeholder="your@email.com"
  helperText="이메일을 입력하세요"
  fullWidth
/>

<Input
  error
  errorMessage="올바른 형식이 아닙니다"
/>
```

---

### Badge
배지 컴포넌트

**Props:**
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `dot`: boolean

**사용 예시:**
```tsx
import { Badge } from '@/shared/ui';

<Badge variant="success">완료</Badge>
<Badge variant="warning" dot>진행 중</Badge>
```

---

### Divider
구분선 컴포넌트

**Props:**
- `orientation`: 'horizontal' | 'vertical'
- `spacing`: 'none' | 'sm' | 'md' | 'lg'

**사용 예시:**
```tsx
import { Divider } from '@/shared/ui';

<Divider spacing="md" />
<div className="flex">
  <span>왼쪽</span>
  <Divider orientation="vertical" spacing="sm" />
  <span>오른쪽</span>
</div>
```

---

## 테마 시스템

### CSS 변수 사용
모든 컴포넌트는 `globals.css`에 정의된 CSS 변수를 사용합니다.

```css
/* 색상 */
--brand-primary
--semantic-success
--text-primary

/* 타이포그래피 */
--font-regular
--font-weight-semibold

/* 그림자 */
--shadow-card
--shadow-dropdown

/* Border Radius */
--radius-md
--radius-lg
```

### 유틸리티 함수

#### remToPx / pxToRem
rem과 px 단위를 상호 변환하는 유틸리티 함수

```tsx
import { remToPx, pxToRem } from '@/shared/lib/rem-to-px';

const pixelValue = remToPx('1.5rem'); // 24
const remValue = pxToRem(24); // "1.5rem"
```

---

## 데모 페이지

모든 컴포넌트의 사용 예시는 `/components` 페이지에서 확인할 수 있습니다.

```bash
npm run dev
# http://localhost:3000/components 방문
```

