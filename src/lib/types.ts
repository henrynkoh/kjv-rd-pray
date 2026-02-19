export type VerseRef = {
  book: string;
  chapter: number;
  verse: number;
  categoryId: string;
};

export type VerseEntry = {
  ref: string;
  book: string;
  chapter: number;
  verse: number;
  categoryId: string;
  categoryLabel: string;
  kjv: string;
  kr: string;
};

export type Category = {
  id: string;
  label: string;
  order: number;
};

export const CATEGORIES: Category[] = [
  { id: "prayer-conversation", label: "기도란 하나님과의 대화", order: 1 },
  { id: "god-near", label: "하나님은 가까이 계심 / 항상 기다리심", order: 2 },
  { id: "first-prayer-seek", label: "첫 기도와 하나님 찾기", order: 3 },
  { id: "seek-to-end", label: "끝까지 찾아올 것", order: 4 },
  { id: "time-space-limited", label: "시공간 제한과 기도로 이끄심", order: 5 },
  { id: "death-eternal-life", label: "죽음, 두려움, 영생", order: 6 },
  { id: "sin-salvation-mercy", label: "죄, 구원, 자비", order: 7 },
  { id: "faith-as-gift", label: "믿음은 선물 (에베소서 2:8, 로마서 3:25)", order: 8 },
  { id: "pray-for-faith", label: "믿음을 구하는 기도 (끈질기게)", order: 9 },
  { id: "kingdom-first", label: "나라와 의를 먼저 / 먹고 사는 것으로 구하지 말 것", order: 10 },
  { id: "lords-prayer", label: "주기도문 (형식이 아닌 내용으로)", order: 11 },
  { id: "no-vain-repetition", label: "헛된 반복 금지", order: 12 },
  { id: "pray-without-ceasing", label: "끊임없이 기도 / 24시간 연결", order: 13 },
  { id: "spirit-helps-prayer", label: "성령이 우리를 위해 기도하심", order: 14 },
  { id: "pray-for-church", label: "교회·목회자·성도를 위한 기도", order: 15 },
  { id: "persecution-stand-firm", label: "핍박과 당당히 서기", order: 16 },
  { id: "pauls-thorn-grace", label: "바울의 가시 / 은혜가 충분함", order: 17 },
  { id: "widow-mite-portion", label: "과부의 두 레pta / 적절한 분량", order: 18 },
  { id: "no-pray-escape-persecution", label: "핍박 피하려는 기도 금지", order: 19 },
  { id: "wisdom-kingdom", label: "나라를 위한 지혜 구함", order: 20 },
  { id: "prayer-education", label: "기도의 교육적 목적", order: 21 },
];

export function getCategoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
