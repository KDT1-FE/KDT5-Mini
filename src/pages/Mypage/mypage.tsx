import useDataQuery from "../../Hooks/useData-Query.tsx";
import UserBanner from "@/Components/userBanner/UserBanner.tsx";
import AnnualList from "@/Components/AnnualList/AnnualList.tsx";
import Header from "../../Components/Header/Header.tsx";
import DutyList from "@/Components/DutyList/DutyList.tsx";
import styles from "./mypage.module.scss";
import { useCookies } from "react-cookie";

export default function Mypage() {
  const { getPageData } = useDataQuery();
  const { isLoading, error, data: myData } = getPageData;
  const [cookies, setCookie] = useCookies(['cookieName']);
  console.log(cookies);


  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <UserBanner name={myData[0].name} />
        <div className={styles.inner_box}>
          <div className={styles.annual}>
            <p className={styles.title}>연차 리스트</p>
            <AnnualList name={myData[0].name} />
          </div>
          <div className={styles.duty}>
            <p className={styles.title}>당직 리스트</p>
            <DutyList name={myData[0].name} />
          </div>
        </div>
      </div>
    </div>
  );
}
