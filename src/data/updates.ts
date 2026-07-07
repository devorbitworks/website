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

export const updates: UpdateEntry[] = [
  {
    version: "v1.0.0",
    date: "2026-07-07",
    title: "오빗웍스 서비스 정식 출시",
    tag: "공지",
    items: [
      "계약관리, 단지관리, 문서관리, 인사관리 기능 제공",
      "앱(근태관리, 순찰관리) 베타 운영 시작",
      "웹 대시보드 정식 오픈",
      // 링크 예시:
      // { type: "link", label: "서비스 소개서 보기", url: "https://..." },
      // 이미지 예시 (public/ 폴더에 파일 넣고):
      // { type: "image", src: "/update-screenshot.png", alt: "새 기능 화면" },
    ],
  },
];
