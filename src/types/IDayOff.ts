export interface IApplyDayOff {
  employeeId: number;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
}

export interface IChangeDayOff {
	startDate: string,
	endDate: string,
	type: string,
  reason: string,
}

//대기, 취소, 승인, 거절
export interface ICancelDayOff {
	status : string
}