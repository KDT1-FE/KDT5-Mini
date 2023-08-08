import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {  getMyPage, postMain } from "@/Api/apis.ts";

const queryClient = new QueryClient();
export default function useDataQuery() {

  // 마이페이지 처음 읽어오는 쿼리
  const getMyPageData = useQuery(
    ['myData'],
    async () => {
      return getMyPage();
    },
    { staleTime: 1000 * 3 }
  );

  const postMainData =
    useMutation((data: NewEvent) => postMain(data), {
      onSuccess: () => {
        queryClient.invalidateQueries(["mainData"]);
      }
    });


  return {postMainData, getMyPageData };
}
