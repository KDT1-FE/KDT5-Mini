export interface IMemberDayOffProps {
  dayOffId: number;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  amount: number;
  reason: string;
}

export interface IMemberDutyProps {
  dutyId: number;
  type: string;
  status: string;
  date: string;
  reason: string;
}

export interface IMemberListProps {
  success: boolean;
  code: string;
  message: string;
  data: {
    name: string;
    email: string;
    dayOffRemains: number;
    dayOffs?: IMemberDayOffProps[];
    duties?: IMemberDutyProps[];
  };
}
export interface IMemberModifyProps {
  employeeId: number;
  department: string;
  name: string;
  phone: string;
  password: string;
}

export interface IprivacyProps {
  success: boolean;
  code: string;
  message: string;
  data: {
    employeeId: number;
    department: string;
    name: string;
    email: string;
    phone: string;
    hireDate: string;
    position: string;
    profilePath: string;
  };
}
