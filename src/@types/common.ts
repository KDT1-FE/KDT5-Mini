declare interface User {
  name: string;
  joinDate: string;
}

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

declare interface LoginType {
  email: string,
  password: string
}

declare type MyDataType = {
  name: string,
  annualBalance: number,
  annual: Array<{
    id: number,
    reason: string,
    startDate: string,
    endDate: string,
    status: string
  }>,
  duty: Array<{
    id: number,
    startDate: string,
    endDate: string,
    status: string
  }>,
}


declare interface MyDataAction {
  addMyData: (myData: MyDataType) => void,
  addAnnual: (annual: AnnualType) => void,
  updateAnnual: (annual: AnnualType) => void,
  deleteAnnual: (id: number) => void
}

declare interface AnnualType {
  id: number,
  reason: string,
  startDate: string,
  endDate: string,
  status: string
}

declare interface DutyType {
  id: number,
  startDate: string,
  endDate: string,
  status: string
}

declare type MyStore = {
  data: MyDataType[];
  addMyData: (myDataArray: MyDataType[]) => void;
};

declare interface User {
  email: string,
  password: string,
  name: string,
  joinDate: string
}

declare type UserActions = {
  addUser: (email: string, name: string, password: string, join: string) => void,
  deleteUser: (email: string) => void,
  updateUser: (email: string, name: string, password: string, join: string) => void
}

declare interface UserStore {
  users: User[];
  addUser: UserActions["addUser"];
  deleteUser: UserActions["deleteUser"];
  updateUser: UserActions["updateUser"];
}
declare interface CounterType {
  annualCal: number,
  count: number,
  setAnnualCal:(value:number) => void,
  setCount:(value:number) => void
}
declare interface ModalProps {
  visibility: boolean;
  toggle: (param: boolean) => void;
}
