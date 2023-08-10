// 프로젝트에 사용되는 types 정리 //

// 사용자 데이터
export interface UserData {
  id: number;
  empNo: number;
  name: string;
  email: string;
  phone: string;
  hospitalId: number;
  deptId: number;
  level: string;
  auth: string;
  status: string;
  annual: number;
  duty: number;
  profileImageUrl: string;
  hiredate: string;
  createdAt: string;
  updatedAt: string;
}

// 로그인
export interface LoginBody {
  email: string;
  password: string;
}

// 회원가입
export interface SignUpBody {
  email: string;
  password: string;
  phone: string;
  name: string;
  hospitalId: number;
  deptId: number;
}

//비밀번호 변경
export interface editPasswordBody {
  newPassword: string;
  oldPassword: string;
}

//마이페이지 수정
export interface EditMyPageBody {
  name: string;
  deptId: number;
  phone: string;
  image: string | null;
}

//연차 등록
export interface CreateAnnualBody {
  startDate: Date;
  endDate: Date;
  reason: string;
}

//연차 내용 수정
export interface EditAnnualBody {
  startDate: Date;
  endDate: Date;
  reason: string;
}

//당직 등록
export interface CreateDutyBody {
  startDate: Date;
}

//당직 내용 수정
export interface EditDutyBody {
  startDate: Date;
  updateDate: Date;
}

//캘린더 조회
export interface Schedule {
  category: string;
  deptName: string;
  endDate: string;
  evaluation: string;
  hospitalName: string;
  id: number;
  level: string;
  name: string;
  startDate: string;
}

//날짜별 휴가 조회
export interface AnnualData {
  deptName: string;
  id: number;
  level: string;
  phone: string;
  username: string;
}

//날짜별 당직 조회
export interface DutyData {
  deptName: string;
  email: string;
  id: number;
  level: string;
  phone: string;
  profileImageUrl: string;
  userId: number;
  username: string;
}
