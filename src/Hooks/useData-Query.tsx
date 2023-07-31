import { useQuery } from "@tanstack/react-query";
import { getMyPage } from "../API/apis.ts";

export default function useDataQuery() {

  const getPageData =
    useQuery(['myData'], getMyPage,{staleTime: 1000 * 60})
  return { getPageData };
}


