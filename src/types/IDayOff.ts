export interface IApplyDayOff {
  employeeId: number;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
}

export interface IChangeDayOff {
	startDate: string | null,
	endDate: string | null,
	type: string,
  reason: string,
  status: string,
  dayOffId: number
}

//대기, 취소, 승인, 거절
export interface ICancelDayOff {
	dayOffId : number,
  employeeId : number,
  status: string
}

export interface IDayOffFormatted {
  amount:number
  dayOffId:number
  endDate:string
  startDate:string
  reason:string
  status:string
  type:string
}