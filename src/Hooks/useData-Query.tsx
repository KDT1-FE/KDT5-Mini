import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getLogin, postUserJoin } from "../Api/api.ts";

// react- query 커스텀 훅

const queryClient = new QueryClient()


export default function useDataQuery(accessToken:string) {

  const getUserData =
    useQuery(["useData", accessToken], () => {
      if (accessToken) {
        return getLogin(accessToken).then((res) => {
          console.log(res);
          return res;
        });
      } else {
        return [];
      }
    }, { staleTime: 1000 * 60 });

  const joinUser =
    useMutation((joinData: JoinUserInputType ) => postUserJoin(joinData), {
      onSuccess: () => {
        queryClient.invalidateQueries(["useData", accessToken]);
      }
    });

  return { joinUser, getUserData };
}


/*
1. provider 설정
2. useQuery 설정
3. 필요한 곳에서 action 실행(Mutation)
*/
