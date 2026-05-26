export const MY_PLANTS_HEADER = {
  title: "저장한 식물",
  description: "마음에 드는 식물을 저장했어요",
} as const;

export const MY_PLANTS_EMPTY = {
  title: "아직 저장한 식물이 없어요",
  description: "마음에 드는 식물에\n♡를 눌러 저장해보세요",
  action: "환경 진단 시작하기",
} as const;

export const MY_PLANTS_ACTIONS = {
  share: "카카오톡 공유",
  shareSelected: "선택한 식물 공유",
  save: "이미지 저장",
  saveSelected: "선택한 식물 저장",
} as const;
