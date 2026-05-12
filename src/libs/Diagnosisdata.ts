export type QuestionType = "choice" | "input";

export interface DiagnosisQuestion {
  id: number;
  title: string;
  description: string;
  type: QuestionType;
  options?: string[];
  inputs?: string[];
}

export const DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  {
    id: 1,
    title: "반려동물을 키우시나요?",
    description: "식물에 따라 반려동물에게 위협이 될 수 있어요",
    type: "choice",
    options: ["예", "아니오"],
  },
  {
    id: 2,
    title: "식물에게 얼마나\n자주 물을 주실 수 있나요?",
    description: "식물에 따라 반려동물에게 위협이 될 수 있어요",
    type: "choice",
    options: ["매일", "이틀 간격", "3~5일 간격", "일주일 이상"],
  },
  {
    id: 3,
    title: "주변 온도와 습도를\n알려주세요",
    description: "식물에 따라 반려동물에게 위협이 될 수 있어요",
    type: "input",
    inputs: ["온도", "습도"],
  },
];
