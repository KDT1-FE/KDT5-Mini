import { AxiosResponse } from "axios";
import { userClient } from "./client";
import { IEmployeeOrder } from "@lib/interface/EmployeeInterface";

// 연차,당직 등록(POST)
export const employeeOrderApi = ({
  orderType,
  startAt,
  endAt,
  reason,
  category,
  etc,
}: IEmployeeOrder) => {
  const result = userClient.post("/api/user/order/add", {
    orderType,
    startAt,
    endAt,
    reason,
    category,
    etc,
  });
  return result;
};

// 연차,당직 삭제(POST)
export const employeeDeleteApi = (Id: number) => {
  const result = userClient.post(`/api/user/order/delete?id=${Id}`);
  return result;
};

// 전자결제 내역(GET)
export function employeeListApi(size: number) {
  const data: Promise<AxiosResponse<any, any>> = userClient.get(
    `/api/user/myorder?page=0&size=${size}`,
  );
  return data || [];
}

//
interface User {
  year: number;
  month: number;
}

export const userscheduleApi = ({ year, month }: User) => {
  try {
    const result = userClient.get(
      `/api/user/main?year=${year}&month=${month}`,
      {
        params: {
          year,
          month,
        },
      },
    );
    return result;
  } catch (e) {
    console.error(e);
  }
};
