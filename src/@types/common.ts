declare interface JoinUserInputType {
  id: string;
  name: string;
  joinDate: string;
}

declare interface LoginOutputType {
  id: string;
  name: string;
  joinDate: string;
  accessToken: string;
  refreshToken?: string;
}

declare interface UserLoginType {
  accessToken: string;
  refreshToken?: string;
}

// declare 사용하여 전역화 시킨다.