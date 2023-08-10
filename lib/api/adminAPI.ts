import { adminClient } from "./client";
import { IRequestBody } from "@lib/interface/Admin";

interface IAdminLogin {
  email: string;
  password: string;
}
export const adminLogin = ({ email, password }: IAdminLogin) => {
  try {
    const result = adminClient.post("/api/login", { email, password });
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 요청 관리 - 결재 처리
export const postUpdateOrder = ({ id, status }: IRequestBody) => {
  const res = adminClient.post(`/api/admin/order/update`, { id, status });
  return res;
};

// 요청 관리 - 결재 대기 조회
export const getPendingOrders = () => {
  const res = adminClient.get(`/api/admin/order/list/status/wait`);
  return res;
};

// 요청관리 - 결재 완료 조회
export const getCompletedOrders = () => {
  const res = adminClient.get(`/api/admin/order/list/status/complete`);
  return res;
};

// 월별 사용 대장 - 당직 조회
export const getMonthlyDuty = (year: number) => {
  const res = adminClient.get(`/api/admin/order/list/monthly/duty?year=${year}`);
  return res;
};

// 월별 사용 대장 - 연차 조회
export const getMonthlyAnnual = (year: number) => {
  const res = adminClient.get(
    `/api/admin/order/list/monthly/annual?year=${year}`,
  );
  return res;
};

// 사원조회 - 사원명 검색
export const getUserName = (name: string) => {
  const res = adminClient.get(`/api/admin/user/search?name=${name}`);
  return res;
};

// 사원조회 - 사원번호 검색
export const getUserNumber = (empno: number) => {
  const res = adminClient.get(`/api/admin/user/search?empno=${empno}`);
  return res;
};

// 사원조회 - 연차/당직 내역
export const getOrders = (user: number, page: number, size: number) => {
  const res = adminClient.get(
    `/api/admin/order/list?user=${user}&page=${page}&size=${size}`,
  );
  return res;
};
