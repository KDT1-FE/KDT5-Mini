import { useQuery } from "@tanstack/react-query";
import { getMyPage } from "../Api/api.ts";

export default function useDataQuery() {

  const getPageData =
    useQuery(['myData'], getMyPage,{staleTime: 1000 * 60})

  return { getPageData,};
}


