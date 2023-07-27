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

declare interface MyDataType {
  name:string,
  annualBalance:number,
  annual?:[
    id:number,
    reason:string,
    startDate:string,
    endDate:string,
    status:string
  ],
  duty?:[
    id:number,
    startDate:string,
    endDate:string,
    status:string
  ]
}
declare interface MyDataUser {
  duty: any;
  annual: any;
  name:string,
  annualBalance:number,
}
declare interface AnnualType {
  id:number,
  reason:string,
  startDate:string,
  endDate:string,
  status:string
}
declare interface DutyType {
  id:number,
  startDate:string,
  endDate:string,
  status:string
}


// declare 사용하여 전역화 시킨다.