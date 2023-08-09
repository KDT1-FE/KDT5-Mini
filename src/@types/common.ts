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
  position:string,
  annualUsed:string,
  annualRemain: number,
  annualHistories: Array<{
    id: number,
    title: string,
    reason: string,
    startDate: string,
    endDate: string,
    status: string,
  }>;
  dutyHistories: Array<{
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    status: string,
  }>;
};


declare interface MyDataAction {
  addMyData: (myData: MyDataType) => void,
  addAnnual: (annual: AnnualType) => void,
  updateAnnual: (annual: AnnualType) => void,
  deleteAnnual: (id: number) => void
}

declare interface AnnualType {
  annual: {
    reason: string;
    title: string;
    startDate: string;
    endDate: string;
    annualRemain: number;
    status: string;
  }[];
}


declare interface DutyType {
  duty:{
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    status: string
  }[];
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
declare interface NewEvent {
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  reason: string;
}

declare type HandleClickType = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

declare interface AddEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleAddEvent: (newEvent: NewEvent) => void; // NewEvent 타입으로 수정
}

declare interface NewEvent {
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  reason: string;
}

declare interface UpdateType {
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  reason: string;
}