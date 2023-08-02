import useDataQuery from "../../Hooks/useData-Query.tsx";
import UserBanner from "@/Components/userBanner/UserBanner.tsx";
import AnnualList from "@/Components/AnnualList/AnnualList.tsx";
import DutyList from "@/Components/DutyList/DutyList.tsx";
import styles from "./mypage.module.scss";

export default function Mypage() {
  const { getPageData } = useDataQuery();
  const { isLoading, error, data: myData } = getPageData;

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <UserBanner name={myData[0].name} />
        <span className={styles.annualTitle}>연차 리스트</span>
        <AnnualList name={myData[0].name} />
        <span className={styles.dutyTitle}>당직 리스트</span>
        <DutyList name={myData[0].name} />
      </div>
    </div>
  );
}
