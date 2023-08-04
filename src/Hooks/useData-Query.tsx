import { useQuery } from "@tanstack/react-query";
import { getMyPage, getUser } from "../API/apis";
import { useMyStore, useUserStore } from "@/Store/store.ts";

export default function useDataQuery() {
  const addUser = useUserStore((state) => state.addUser);
  const addMyData = useMyStore((state) => state.addMyData);

  const getUserData = useQuery(
    ["userData"],
    () => {
      return getUser().then((res) => {
        res.forEach((item: User) =>
          addUser(item.email, item.password, item.name, item.joinDate),
        );
        return res;
      });
    },
    { staleTime: 1000 * 60 },
  );

  const getPageData = useQuery(
    ["myData"],
    () => {
      return getMyPage().then((res) => {
        addMyData(res);
        return res;
      });
    },
    { staleTime: 1000 * 60 },
  );

  return { getPageData, getUserData };
}
