export interface IEmployeeOrder {
  id?: number;
  orderType: string;
  startAt: string;
  endAt: string;
  reason?: string | null;
  category?: string | null;
  etc?: string | null;
}
export interface Headers {
  ContentType: string;
  Authorization: string;
  AuthorizationRefresh: string;
}

export interface IEmployeeMonthly {
  id: number;
  orderType: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface IEmployeeMonthlyRequest {
  year: number;
  month: number;
}

export interface IEmployeeListRequest {
  id: number;
  empName: string;
  createdAt: string;
  orderType: string;
  status: string;
  startDate: string;
  endDate: string;
  reason?: null;
  category?: string;
  etc?: string;
}
