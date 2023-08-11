// 로그인 리퀘스트 바디 인터페이스
export interface ISignInRequestBody {
  email?: string;
  password?: string;
  accessToken?: string;
}

export interface ISignInUser {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireDate: number;
}
