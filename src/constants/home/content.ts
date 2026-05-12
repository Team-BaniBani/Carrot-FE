export type PopularPlant = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export const HOME_GREETING = "안녕하세요";
export const HOME_TITLE_LINES = ["내 공간에 맞는", "식물을 찾아볼까요?"] as const;

const STUCKY_IMAGE_URL =
  "http://localhost:3845/assets/6be99f52918ab1107ee0acfb1c46d8a013efbb7e.png";
const MONSTERA_IMAGE_URL =
  "http://localhost:3845/assets/67857e92afc53bc7e6b76ad289ef6d9fd87852bb.png";

export const HOME_POPULAR_PLANTS: PopularPlant[] = [
  {
    id: "stucky",
    name: "스투키",
    description: "관리 쉬움",
    imageUrl: STUCKY_IMAGE_URL,
  },
  {
    id: "monstera-1",
    name: "몬스테라",
    description: "인테리어 인기",
    imageUrl: MONSTERA_IMAGE_URL,
  },
  {
    id: "monstera-2",
    name: "몬스테라",
    description: "인테리어 인기",
    imageUrl: MONSTERA_IMAGE_URL,
  },
];

export const HOME_POPULAR_SECTION_TITLE = "인기 식물";
export const HOME_TIP_SECTION_TITLE = "식물 팁";
export const HOME_TIP_TEXT =
  "겨울철에는 물주기 간격을 늘려주세요. 대부분의 식물이 겨울에는 성장이 느려집니다";