import { Dispatch, SetStateAction } from "react";

// Approval Modal
export interface IModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  details: any;
}
// Data Table
export interface IDataTableProps {
  tableTitle: string;
  dataSource: IDataSourceItem[];
  type: string;
}

export interface IDataSourceItem {
  id: number;
  empName: string;
  createdAt: string;
  orderType: string;
  status: string;
  startDate: string;
  endDate: string;
  reason?: string;
  category?: string;
  etc?: string;
}

// Monthly Table
export interface IMonthlyPros {
  dataSource: IColumnsData[];
}

export interface IColumnsData {
  id: number;
  empName: string;
  empNo: number;
  month: IMonth;
  total: number;
}
export interface IMonth {
  [key: string]: number;
}

// 요청 관리 - 결재 처리
export interface IRequestBody {
  id: number;
  status: string;
}

// 요청관리 페이지
export interface IDataSourceItem {
  id: number;
  empName: string;
  createdAt: string;
  orderType: string;
  status: string;
  startDate: string;
  endDate: string;
  reason?: string;
  category?: string;
  etc?: string;
}

// 월별 사용대장 페이지
export interface IColumnsData {
  id: number;
  empName: string;
  empNo: number;
  month: IMonth;
  total: number;
}

export interface ISearch {
  id: number;
  empNo: number;
  empName: string;
  createdAt: string;
}
