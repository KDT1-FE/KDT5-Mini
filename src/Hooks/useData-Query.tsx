import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getMyPage, postDelete, postUpdate } from "@/Api/apis.ts";


export default function useDataQuery() {
const queryClient = new QueryClient();
  // 마이페이지
  const getMyPageData = useQuery(
    ['myData'],
    async () => {
      return await getMyPage().then(res => {
        console.log(res);
        return res});
    },
    { staleTime: 1000 * 3 }
  );
  const changeMyData =
   useMutation((data:UpdateType) => postUpdate(data),{
     onSuccess: () => {
       queryClient.invalidateQueries(['myData']).then(res => console.log(res))
       console.log('수정 성공');
     }
   })
  const deleteMyData =
    useMutation((id: number) => postDelete(id), {
      onSuccess: () => {
        queryClient.invalidateQueries(['myData']).then(res => console.log(res))
        console.log('삭제 성공');
      }
    });

  // amin 페이지
  // const getAdminPageData = useQuery(
  //   ['adminData'],
  //   async () => {
  //     return await getListAll().then(res => {
  //       console.log(res);
  //       return res});
  //   },
  //   { staleTime: 1000 * 60 }
  // );
  // const changeAdminData =
  //   useMutation((data:UpdateType) => postUpdate(data),{
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['adminData']);
  //     }
  //   })



  return {getMyPageData,changeMyData,deleteMyData};
}
