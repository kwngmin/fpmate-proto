# CSS Modules Migration Notes

Next.js 13 + MUI 환경으로 이식 시 발생할 수 있는 CSS Reset 이슈를 해결한 내역입니다.

## 주요 수정 사항

### 1. Button 태그 Reset
Next.js 13 + MUI 환경에서 button의 기본 배경색과 border가 적용되는 문제를 해결했습니다.

**수정된 모든 CSS 파일:**
- Hero.module.css
- Header.module.css
- Footer.module.css
- Section1~5.module.css
- Card.module.css
- Badge.module.css
- InsightCard.module.css
- reset.css

**적용된 CSS:**
```css
/* CSS Modules에서는 :global() wrapper 사용 */
:global(button) {
  background: none;
  background-color: transparent;
  border: none;
  border-width: 0;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  outline: none;
}
```

**중요:** CSS Modules는 순수 태그 셀렉터를 허용하지 않으므로 `:global()` wrapper를 사용해야 합니다.

### 2. P 태그 마진 제거
Tailwind CSS의 reset이 없는 환경에서 `<p>` 태그의 기본 상하단 마진이 레이아웃을 틀어뜨리는 문제를 해결했습니다.

**수정된 파일:**
- `Hero.module.css` - `.description`
- `Section1.module.css` - `.description`, `.footerText`
- `Section2.module.css` - `.description`
- `Section3.module.css` - `.description`, `.reportNote`, `.fpReportText p`
- `Section5.module.css` - `.description`

**적용된 CSS:**
```css
margin: 0;
```

### 3. 제목(Heading) 태그 마진 제거
모든 section의 제목 요소에 `margin: 0` 추가:

**수정된 파일:**
- `Hero.module.css` - `.titleWrapper`
- `Section1.module.css` - `.title`
- `Section2.module.css` - `.title`
- `Section3.module.css` - `.title`
- `Section4.module.css` - `.title`
- `Section5.module.css` - `.title`

### 4. List 아이템 마진 제거
Section4의 리스트 아이템에 기본 마진 제거:

**수정된 파일:**
- `Section4.module.css` - `.listItem`, `.cardContent ul`

### 5. Filter 속성 수정
`filter: brightness(0) invert(1)`이 검은 ring을 생성하는 문제를 해결하기 위해 더 정확한 white filter로 변경:

**수정된 파일:**
- `Hero.module.css` - `.checkIcon`, `.progressCheckIcon`, `.progressNumberIconActive`

**변경 전:**
```css
filter: brightness(0) invert(1);
```

**변경 후:**
```css
filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
```

### 6. Shadow 스타일 최적화
과도한 shadow 값을 MUI 환경에 맞게 조정:

**수정된 파일:**
- `Card.module.css` - `.elevated`, `.hoverable:hover`
- `InsightCard.module.css` - `.cardFirst`
- `Hero.module.css` - `.step1Inner`, `.step2Inner`, `.step4Inner`, `.step5Dropdown`

**주요 변경:**
- `box-shadow: 0 10px 15px -3px` → `0 4px 6px -1px` (더 부드러운 shadow)
- 카드 그림자를 좌측으로 이동 (`-4px 0 6px`)하여 왼쪽 border 효과 강조

## 추가 생성된 파일

### reset.css
기본 CSS Reset 파일 (필요시 사용):
- p, h1~h6, ul, ol, button 등의 기본 스타일 제거
- box-sizing: border-box 적용

**사용 방법:**
```tsx
import './reset.css';
```

## Next.js 13 + MUI 환경으로 이식 시 체크리스트

✅ **완료된 사항:**
- [x] button 태그 background & border 제거
- [x] p 태그 margin 제거
- [x] heading 태그 margin 제거
- [x] list 요소 margin 제거
- [x] filter 속성 수정 (white icon)
- [x] shadow 값 최적화

⚠️ **추가 확인이 필요한 사항:**
- [ ] MUI의 기본 typography와 충돌 여부
- [ ] MUI theme의 breakpoint와 일치 여부
- [ ] 전역 CSS 변수 설정 (--border-primary, --brand-primary 등)

## CSS 변수 목록

프로젝트에서 사용하는 CSS 변수들:
```css
--brand-primary: #00ab55;
--border-primary: rgb(229 231 235);
--border-secondary: rgb(229 231 235);
--border-tertiary: rgb(229 231 235);
--bg-primary: rgb(255 255 255);
--bg-secondary: rgb(249 250 251);
--bg-tertiary: rgb(243 244 246);
--bg-paper: rgb(255 255 255);
--text-primary: rgb(17 24 39);
--text-secondary: rgb(107 114 128);
--text-tertiary: rgb(156 163 175);
--accent-primary: rgb(59 130 246);
--accent-hover: rgb(37 99 235);
--header-bg: rgba(255, 255, 255, 0.8);
--header-blur: 8px;
--header-border: rgba(0, 0, 0, 0.1);
```

이 변수들은 MUI theme에 맞게 조정이 필요할 수 있습니다.

