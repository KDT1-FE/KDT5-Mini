// 전체 '연차/당직' 신청 리스트 타입 정의
// /api/admin/
export declare interface AdminListsAll {
  id: number;
  name: string;
  category: string;
  title: string;
  startDate: string;
  endDate: string;
  reason?: string;
  status: string;
}
