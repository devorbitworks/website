export const privacy = 'https://orbitworks.gitbook.io/orbitworks-docs/undefined-3/undefined-1';
export const terms = 'https://orbitworks.gitbook.io/orbitworks-docs/undefined-3/undefined';
export const nav = [
  {href:'/company', label:'회사소개'}, {href:'/business',label:'사업영역'},
  {href:'/',label:'오빗웍스',detail:'경비·미화 용역관리 그룹웨어'}, {href:'/updates',label:'업데이트'},
];

export type OrbitShortcut = {
  id: string;
  label: string;
  description: string;
  icon: 'contract' | 'complex' | 'asset' | 'official' | 'people' | 'deployment' | 'overview' | 'patrol';
  planned?: boolean;
};

// Keep this order aligned with the approved operation cards in content-map.json.
export const operationFeatureIds = [
  'employee-information', 'contract-renewal', 'assignment', 'documents',
  'official-documents', 'assets', 'schedule', 'permissions', 'dashboard',
] as const;

export const orbitShortcuts: readonly OrbitShortcut[] = [
  {id:'product', label:'계약', description:'단지별 계약 상태와 기간, 투입 인원을 함께 확인합니다.', icon:'contract'},
  {id:'complexes', label:'단지', description:'단지별 계약 정보와 투입 인원을 함께 살펴봅니다.', icon:'complex'},
  {id:'assets', label:'자산', description:'단지 자산을 별도 대장으로 구분해 관리합니다.', icon:'asset'},
  {id:'official-documents', label:'공문서 수발신', description:'수신·발신 기록과 접수 정보, 첨부자료를 확인합니다.', icon:'official'},
  {id:'personnel', label:'인사', description:'근로자 정보와 계약·단지 배정을 한 흐름으로 관리합니다.', icon:'people'},
  {id:'deployment', label:'배치·폐지 신고', description:'신고 자료와 발송·처리 상태를 함께 확인합니다.', icon:'deployment'},
];

export const orbitMoreShortcuts: readonly OrbitShortcut[] = [
  {id:'features', label:'전체 운영 기능', description:'문서·일정·권한·운영 대시보드까지 살펴보세요.', icon:'overview'},
  {id:'patrol', label:'현장 순찰', description:'준비 중인 순찰 흐름과 개발 계획을 확인하세요.', icon:'patrol', planned:true},
];
