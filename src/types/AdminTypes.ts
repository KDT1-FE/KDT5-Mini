// 사용자 목록 조회
// GET /api/admin/user
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'

// Req : 없음
// Res 200 OK
export interface userWrapper {
  data: userInfo[];
}

export type userListData = userInfo[]

export interface userInfo {
  id: number
  email: string // 사용자 아이디
  name: string // 사용자 이름
  employeeNumber: string
  restAnnual: number
  workDay: number
}

// 사용자 계정 삭제
// DELETE /api/admin/user/{id}
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'

// Req : 없음
// Res 200 OK

// 당직 등록
// POST /api/admin/work
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'

export interface workRegistReq {
  id: number
  date: string // YYYY-MM-DD
}

// Res 201 Created

export interface workRegistData {
  message: string // "당직 등록에 성공했습니다"
}

// 당직 삭제
// DELETE /api/admin/work/{workId}
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'
// 당직 일정의 workId를 함께 요청

// Req: 없음
// Res 200 OK

// 관리자 연차 조회
// GET /api/admin/annual
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'

// Req : 없음
// Res 200 OK

export type annualAdminData = annualAdminInfo[]

export interface annualAdminInfo {
  annualId: number
  name: string
  employeeNumber: string
  date: string
  status: 'UNAPPROVED' | 'CANCELED'
}

export type annualAdmin = {
  data: annualAdminInfo[]
}

// 관리자 연차 승인
// POST /api/admin/annual/{annualId}
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'
// status가 CANCELED인 경우 해당 연차는 삭제
// status가 `UNAPPROVED`인 경우 해당 연차의 상태를 `APPROVED`로 변경

// Req : 없음
// Res 200 OK

export interface annualAdminApproveData {
  message: string // "승인되었습니다"
}

// 관리자 연차 거부
// DELETE /api/admin/annual/{annualId}
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'
// - status가 `CANCELED`인 경우 해당 연차의 상태를 다시 `APPROVED`로 변경
// - status가 `UNAPPROVED`인 경우 해당 연차를 삭제

// Req : 없음
// Res 200 OK
