export type OnboardingStepContent = {
  step: 1 | 2 | 3;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  actionText: string;
  skipText?: string;
};

export const ONBOARDING_STEPS: OnboardingStepContent[] = [
  {
    step: 1,
    title: "내 공간에 맞는\n식물을 찾아보세요",
    description: "몇 가지 질문에 답하면 당신의\n공간에 딱 맞는 식물을 추천해드려요",
    imageSrc: "/assets/onboarding/Illustration.svg",
    imageAlt: "온보딩 첫 단계 일러스트",
    actionText: "다음",
    skipText: "건너뛰기",
  },
  {
    step: 2,
    title: "햇빛, 온도, 습도\n간단한 키워드만 골라요",
    description: "어려운 식물 지식이 없어도 괜찮아요\n키워드를 고르면 환경을 자동 분석 해요",
    imageSrc: "/assets/onboarding/llustration2.svg",
    imageAlt: "온보딩 두 번째 단계 일러스트",
    actionText: "다음",
    skipText: "건너뛰기",
  },
  {
    step: 3,
    title: "나만의 식물 리스트를\n저장하고 공유하세요",
    description: "마음에 드는 식물은 저장하고\n카카오톡으로 친구에게 공유해보세요",
    imageSrc: "/assets/onboarding/lustration3.svg",
    imageAlt: "온보딩 세 번째 단계 일러스트",
    actionText: "다음",
    skipText: "건너뛰기",
  },
];
