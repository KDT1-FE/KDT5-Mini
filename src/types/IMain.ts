export interface IPrivacyRes {
  success: boolean;
  code: string;
  message: string;
  data?: IPrivacy[];
}
export interface IPrivacy {
  employeeId: number;
  name: string;
  department: string;
  hireDate: string;
  phone: string;
  email: string; 
}

export interface IDayOffHistory {
  success: boolean
  code: string
  message: string
  data: IHistory[]
}

export interface IHistory{
  name: string
  email: string
  dayOffRemains: number
  dayOffS: IDayOffSchedules[]
  duties: IDutiesSchedules[]
}

export interface IDayOffSchedules{
  dayOffId: number
  type: string
  status: string
  startDate: string
  endDate: string
  amount: number
  reason: string
}

export interface IDutiesSchedules{
  dutyId: number
  type: string
  date: string
  reason: string
}
