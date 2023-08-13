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

export interface IDutiesFormatted {
  dutyId:number
  date:string
  status:string
  type:string
}