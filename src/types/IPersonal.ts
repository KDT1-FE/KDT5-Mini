export interface IPersonal {
  employeeId: number;
  department: string;
  name: string;
  email: string;
  phone: string;
  hireDate: string;
}

export interface IMember extends IPersonal {
  profilePath: string;
  position: string;
}
