// 일정목록 조회 (연차)
// GET /api/schedule/annual?year={2023}&month={7}

// requestData : 없음

// Res 200 OK

// Status가 Approved, Canceled 상태인 것만 가져옴.
// Res.data
export type annualData = annualInfo[]

export interface annualInfo {
  annualId: number // 연차 아이디
  name: string // 연차 사용자 이름
  employeeNumber: string // 연차 사용자 사원번호
  date: string // 당직 날짜
  status: 'APPROVED' | 'CANCELED' | 'UNAPPROVED' // 연차 상태
}

// 일정 목록 조회(당직)
// GET /api/schedule/work?year={year}&month={month}
// requestData : 없음
// Res 200 Ok

// Status가 Approved, Canceled 상태인 것만 가져옴.
// Res.data
export type workData = workInfo[]

export interface workInfo {
  workId: number // 당직 아이디
  name: string // 당직 근무자 이름
  employeeNumber: string // 당직 근무자 사원번호
  date: string // 당직 날짜
}

// 연차 등록 신청
// POST /api/schedule/annual
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'

// Req
export interface annualApplyReq {
  date: string // 연차 신청 날짜 (YYYY-MM-DD)
}

// Res 201 Created

export interface annualApplyData {
  message: string // "연차 등록에 성공했습니다"
}

export interface DateClickInfo {
  date: Date
  dateStr: string
  allDay: boolean
  dayEl: HTMLElement
  jsEvent: MouseEvent
  view: unknown
  resource?: unknown
}

export interface Events {
  title: string
  date: string
  backgroundColor?: string
  borderColor?: string
}
