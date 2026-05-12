export type SavedPlant = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export const DIAGNOSED_HOME_GREETING = "다시 오셨군요";
export const DIAGNOSED_HOME_TITLE_LINES = ["오늘도 식물과", "함께하는 하루!"] as const;

export const DIAGNOSED_REDIAGNOSE_LABEL = "다시 진단하기";

const STUCKY_IMAGE_URL =
  "http://localhost:3845/assets/6be99f52918ab1107ee0acfb1c46d8a013efbb7e.png";
const MONSTERA_IMAGE_URL =
  "http://localhost:3845/assets/67857e92afc53bc7e6b76ad289ef6d9fd87852bb.png";

export const DIAGNOSED_SAVED_PLANTS_TITLE = "저장한 식물";
export const DIAGNOSED_EMPTY_SAVED_PLANTS_TITLE = "아직 저장한 식물이 없어요";
export const DIAGNOSED_EMPTY_SAVED_PLANTS_DESCRIPTION =
  "마음에 드는 식물에\n♡를 눌러 저장해보세요";

export const DIAGNOSED_SAVED_PLANTS: SavedPlant[] = [
//   {
//     id: "saved-stucky",
//     name: "스투키",
//     description: "관리 쉬움 · 공기 정화 높음",
//     imageUrl: STUCKY_IMAGE_URL,
//   },
//   {
//     id: "saved-monstera",
//     name: "몬스테라",
//     description: "관리 보통 · 인테리어 효과",
//     imageUrl: MONSTERA_IMAGE_URL,
//   },
];
