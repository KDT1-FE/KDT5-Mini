import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getMain, getMyPage, postMain } from "@/Api/apis.ts";

const queryClient = new QueryClient();
export default function useDataQuery() {

  // 마이페이지 처음 읽어오는 쿼리
  const getMyPageData = useQuery(
   ['myData'],
    () => {
     return getMyPage().then((res) => {
       return res
     })
    },{staleTime: 1000 * 3}
  );


  const getMainData = useQuery(
    ["mainData"],
    () => {
      return getMain().then((res) => {
        return res;
      });
    }, { staleTime: 1000 * 60 }
  );

  const postMainData =
    useMutation((data: NewEvent) => postMain(data), {
      onSuccess: () => {
        queryClient.invalidateQueries(["mainData"]);
      }
    });


  return { getMainData, postMainData, getMyPageData };
}
