import { IAuthSignUpInput } from '@/types/IAuth';

// 이메일 유효성 정규식
export const rEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 영문+숫자로 이루어진 8자리 이상, 16자리 이하 유효성 정규식
export const rPassword = /^(?=.*[A-Za-z])(?=.*\d).{8,16}$/;

// 문자열에서 숫자가 아닌 모든 문자를 빈 문자열로 대체하는 정규식
export const rNumber = /[^0-9]/g;

// dash로 구분하는 휴대전화 번호 표현 정규식
export const rPhone = /^(\d{2,3})(\d{3,4})(\d{4})$/;

export const MEMBER_USER_INFO = {
  department: '',
  name: '',
  email: '',
  phone: '',
  hireDate: '',
  profileImagePath: ''
};

// 회원가입 Input 정보
export const SIGNUP_INPUT_INFO: IAuthSignUpInput[] = [
  {
    label: '이름',
    name: 'name',
    placeholder: '이름을 입력해주세요',
    type: 'text'
  },
  {
    label: '이메일',
    name: 'email',
    button: '중복확인',
    placeholder: '예) jindojoon@soonyang.com',
    type: 'email'
  },
  {
    label: '비밀번호',
    name: 'password',
    placeholder: '영문, 숫자 조합 8-16자',
    type: 'password'
  },
  {
    label: '비밀번호 확인',
    name: 'confirmPassword',
    placeholder: '비밀번호를 한번 더 입력해주세요.',
    type: 'password'
  },
  {
    label: '휴대폰 번호',
    name: 'phone',
    placeholder: '숫자만 입력해주세요',
    type: 'tel'
  }
];
