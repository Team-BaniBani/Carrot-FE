export type PlantEnvironmentId = "water" | "temperature" | "humidity" | "sunlight";

export type PlantEnvironmentItem = {
  id: PlantEnvironmentId;
  label: string;
  value: string;
};

export const PLANT_DETAIL = {
  headerTitle: "식물 정보",
  name: "스투키",
  englishName: "Stucky",
  description:
    "건조한 아프리카 동부가 원산지인 다육식물로 학명 Dracaena stuckyi의 종명 부분을 한국어로 발음한 것이다",
  imageUrl: "/icons/plant.svg",
  tags: ["관리 쉬움", "공기정화 높음", "중형"],
  environment: [
    {
      id: "water",
      label: "물주기",
      value: "1주 1회",
    },
    {
      id: "temperature",
      label: "적정 온도",
      value: "18~25°C",
    },
    {
      id: "humidity",
      label: "적정 습도",
      value: "50~70%",
    },
    {
      id: "sunlight",
      label: "햇빛",
      value: "중간 (간접광)",
    },
  ] as PlantEnvironmentItem[],
} as const;
