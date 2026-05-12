const STUCKY_IMAGE_URL = "http://localhost:3845/assets/6be99f52918ab1107ee0acfb1c46d8a013efbb7e.png";
const MONSTERA_IMAGE_URL = "http://localhost:3845/assets/67857e92afc53bc7e6b76ad289ef6d9fd87852bb.png";

export const MY_PLANTS_HEADER = {
  title: "저장한 식물",
  description: "2종의 식물을 저장했어요",
} as const;

export const MY_PLANTS_EMPTY = {
  title: "아직 저장한 식물이 없어요",
  description: "마음에 드는 식물에\n♡를 눌러 저장해보세요",
  action: "환경 진단 시작하기",
} as const;

export type MyPlantTags = {
  primary: string;
  secondary: string[];
};

export type EnvironmentIconKey = "blur" | "lucidity";

export type MyPlantItem = {
  id: string;
  environmentLabel: string;
  environmentIcon: EnvironmentIconKey;
  imageUrl: string;
  imageOverlayUrl?: string;
  name: string;
  englishName: string;
  tags: MyPlantTags;
};

export const MY_PLANTS_SAVED: MyPlantItem[] = [
  {
    id: "stucky",
    environmentLabel: "햇빛 풍부한 공간",
    environmentIcon: "lucidity",
    imageUrl: STUCKY_IMAGE_URL,
    name: "스투키",
    englishName: "Stucky",
    tags: {
      primary: "관리 쉬움",
      secondary: ["공기정화 높음", "중형"],
    },
  },
  {
    id: "monstera",
    environmentLabel: "반음지 공간",
    environmentIcon: "blur",
    imageUrl: STUCKY_IMAGE_URL,
    imageOverlayUrl: MONSTERA_IMAGE_URL,
    name: "몬스테라",
    englishName: "Stucky",
    tags: {
      primary: "관리 보통",
      secondary: ["인테리어", "대형"],
    },
  },
];

export const MY_PLANTS_ACTIONS = {
  share: "카카오톡 공유",
  save: "이미지 저장",
} as const;
