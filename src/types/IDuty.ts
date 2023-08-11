export interface IApplyDuty {
  employeeId: number;
  date: string;
}

export interface IChangeDuty {
  date: string
}

export interface ICancelDuty {
	status: string
}