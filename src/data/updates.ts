export type UpdateTag = "기능 추가" | "개선" | "버그 수정" | "공지";

export type UpdateItem =
  | string                                          // 텍스트 bullet
  | { type: "link"; label: string; url: string }   // 링크
  | { type: "image"; src: string; alt?: string };  // 이미지

export interface UpdateEntry {
  version: string;
  date: string;
  title: string;
  tag: UpdateTag;
  items: UpdateItem[];
}

export const updates: UpdateEntry[] = [];
