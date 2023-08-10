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
  try {
    const result = userClient.post("/api/user/order/add", {
      orderType,
      startAt,
      endAt,
      reason,
      category,
      etc,
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 연차,당직 삭제(POST)
export const employeeDeleteApi = (Id: number) => {
  try {
    const result = userClient.post(`/api/user/order/delete?id=${Id}`);
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 전자결제 내역(GET)
export function employeeListApi() {
  try {
    const data: Promise<AxiosResponse<any, any>> = userClient.get(
      "/api/user/myorder?page=0&size=10",
    );
    return data || [];
  } catch (e) {
    console.error(e);
  }
  console.log("안나옴");
}


interface User {
  year: number;
  month: number;
}

export const userschedule = async ({ year, month }: User) => {
  try {
    const result = await userClient.get(`/api/user/main?year=${year}&month=${month}`, {
      params: {
        year,
        month,
      },
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};