<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Structure

```
src/
  app/                  # Next.js App Router (Server Components by default)
  components/           # 재사용 가능한 공통 UI 컴포넌트
    layout/             # AppShell, BottomNav 등 레이아웃
    ui/                 # 기능별 UI 컴포넌트 (button, tabs, spaceFeature, ...)
  containers/           # 도메인별 섹션 컴포넌트 (평탄 구조)
  constants/            # 도메인별 정적 데이터 및 문자열
  services/             # 서버사이드 데이터 조회 함수
  stores/               # Zustand 클라이언트 상태 스토어
  hooks/                # 커스텀 React 훅
  styles/               # 디자인 토큰 (colors, design, typography)
```

---

## 1) Styling and Design Tokens

- `/src/styles/design.ts`, `colors.ts`, `typography.ts`의 토큰을 항상 참조한다.
- `tailwind.config.ts`에 등록된 토큰 기반 유틸리티 클래스를 사용한다.
- 임의의 숫자 값(`w-[123px]`)보다 토큰 클래스(`p-card`, `rounded-card`, `max-w-app`)를 우선한다.

---

## 2) page.tsx 작성 규칙

- `page.tsx`는 반드시 **Server Component**여야 한다.
- **`"use client"`는 어떤 이유로도 `page.tsx`에 추가하지 않는다. 예외 없음.**
  - 클라이언트 로직이 필요하면 해당 로직을 containers/ 또는 components/ 안의 별도 컴포넌트로 분리하고 그 파일에 `"use client"`를 붙인다.
- 서버사이드 로직(서비스 호출, 쿠키, 리다이렉트)을 직접 처리한다.
- 섹션 컴포넌트들을 직접 조합해서 페이지 레이아웃을 완성한다.
- **`page.tsx`에서 컨테이너 하나만 호출하는 래퍼 패턴 금지.**
  - 상태에 따른 분기는 삼항 연산자로 `page.tsx` 안에서 직접 처리한다.

**실제 예시 — `src/app/home/page.tsx`:**

```tsx
import getDiagnosisStatus from "@/services/home/getDiagnosisStatus";
import HomeHeader from "@/containers/home/HomeHeader";
import HomeSpaceFeature from "@/containers/home/HomeSpaceFeature";
import HomePopularPlants from "@/containers/home/HomePopularPlants";
import HomePlantTip from "@/containers/home/HomePlantTip";
import DiagnosedRediagnoseAction from "@/containers/home/DiagnosedRediagnoseAction";
import DiagnosedSavedPlantsSection from "@/containers/home/DiagnosedSavedPlantsSection";

export default function HomePage() {
  const isDiagnosed = getDiagnosisStatus();

  return (
    <div className="app-shell flex flex-1 min-h-0 flex-col overflow-auto bg-background px-4 pb-6 pt-6">
      <HomeHeader isDiagnosed={isDiagnosed} />
      <HomeSpaceFeature isDiagnosed={isDiagnosed} />
      {isDiagnosed ? (
        <>
          <DiagnosedRediagnoseAction />
          <DiagnosedSavedPlantsSection />
        </>
      ) : (
        <>
          <HomePopularPlants />
          <HomePlantTip />
        </>
      )}
    </div>
  );
}
```

> 복잡한 서버사이드 로직(쿠키 검증, 리다이렉트 등)이 있을 땐 `page.tsx`에 직접 작성한다.
> 참고: `src/app/onboarding/page.tsx`

---

## 3) containers/ 작성 규칙

- 도메인 폴더 안은 **평탄(flat) 구조**. 하위 폴더를 만들지 않는다.
- 컨테이너는 특정 도메인의 **UI 섹션 단위**. 단순 래퍼 컨테이너는 만들지 않는다.
- 클라이언트 훅(`useRouter`, `useState` 등)이 필요한 경우에만 `"use client"` 추가.
- 구조가 동일하고 props 하나로 분기되는 컴포넌트는 두 파일로 나누지 않고 하나로 합친다.

```
containers/
  home/
    HomeHeader.tsx              # isDiagnosed prop으로 텍스트 분기
    HomeSpaceFeature.tsx        # isDiagnosed prop으로 UI 분기
    HomePlantTip.tsx
    HomePopularPlants.tsx
    DiagnosedRediagnoseAction.tsx
    DiagnosedSavedPlantsSection.tsx
  onboarding/
    OnboardingContainer.tsx     # 온보딩 전체 로직 (use client)
    OnboardingFrame.tsx
    OnboardingStage.tsx
    OnboardingActions.tsx
```

---

## 4) components/ vs containers/

| | `components/` | `containers/` |
|---|---|---|
| 성격 | 범용 재사용 UI | 도메인 특화 섹션 |
| 도메인 의존 | 없음 | 있음 (constants, services 참조 가능) |
| 예시 | `Button`, `Tabs`, `SpaceFeatureDefault` | `HomeHeader`, `DiagnosedSavedPlantsSection` |

---

## 5) 새 라우트 추가 시 체크리스트

1. `src/app/<domain>/page.tsx` — 서버 컴포넌트, 서비스 호출 + 섹션 조합
2. `src/containers/<domain>/` — 섹션 컴포넌트들 (flat)
3. `src/constants/<domain>/` — 정적 데이터 및 문자열
4. `src/services/<domain>/` — 서버사이드 데이터 조회 함수 (필요시)
