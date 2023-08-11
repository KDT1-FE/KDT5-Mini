export interface IAuthSignUpInput {
  label: string;
  name: string;
  button?: string;
  placeholder?: string;
  type: string;
}

export interface IAuthSignUpItem {
  label: string;
  name: string;
  button?: string;
  placeholder?: string;
  type: string;
}

export interface IAuthValidPw {
  password: string;
}

export interface IAuthResetPw {
  authToken: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthFindPw {
  email: string;
}

export interface IAuthValidPw {
  password: string;
}

export interface IAuthChangePw {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
