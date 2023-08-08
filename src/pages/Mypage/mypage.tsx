import UserBanner from "@/Components/userBanner/UserBanner.tsx";
import AnnualList from "@/Components/AnnualList/AnnualList.tsx";
import Header from "../../Components/Header/Header.tsx";
import DutyList from "@/Components/DutyList/DutyList.tsx";
import styles from "./mypage.module.scss";
import useDataQuery from "@/Hooks/useData-Query.tsx";
import { useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";

export default function Mypage() {

  const queryClient = new QueryClient()
  const {getMyPageData} = useDataQuery()
  const {isLoading, error, data:myData} = getMyPageData

  useEffect(() => {
    queryClient.invalidateQueries(['myData']); // 쿼리를 재요청하여 데이터 갱신
  }, [myData]);


  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <UserBanner myData={myData} />
        <div className={styles.inner_box}>
          <div className={styles.annual}>
            <p className={styles.title}>연차 리스트</p>
            <AnnualList myData={myData} />
          </div>
          <div className={styles.duty}>
            <p className={styles.title}>당직 리스트</p>
            <DutyList myData={myData} />
          </div>
        </div>
      </div>


    </div>
  );
}