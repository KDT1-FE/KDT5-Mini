// Req : Request
// Res : Response

//로그인
// /api/login
// 요청
export interface LoginReq {
  email: string
  password: string
}

// 응답
export interface LoginResData {
  user: User
  token: string
}

// LoginRes.data
export interface User {
  email: string
  name: string
  employeeNumber: string
  role: 'ROLE_ADMIN' | 'ROLE_USER'
}

// 회원가입
// /api/signup
export interface SignupReq {
  email: string // 사용자 아이디 (필수!)
  name: string // 사용자 이름, 20자 이하 (필수!)
  password: string // 사용자 비밀번호, 8자 이상 (필수!)
  employeeNumber: string // 사원번호(uuid) 생성한 uuid 값 그대로!
}

// signupRes.data
export interface SignupResData {
  message: string
}
// 실패 시 statusCode: 400, message: '이미 존재하는 이메일입니다.'

// 로그아웃
//POST /api/logout
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'
// req 없음

// res 200 OK
export interface LogoutResData {
  message: string
}
