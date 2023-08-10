import UserBanner from "@/Components/userBanner/UserBanner.tsx";
import AnnualList from "@/Components/AnnualList/AnnualList.tsx";
import Header from "../../Components/Header/Header.tsx";
import DutyList from "@/Components/DutyList/DutyList.tsx";
import styles from "./mypage.module.scss";
import { useState } from "react";
import Password from "@/Components/Password/password.tsx";
import useDataQuery from "@/Hooks/useData-Query.tsx";

export default function Mypage() {
  const [category, setCategory] = useState(false);
  const {getMyPageData} = useDataQuery()
  const {isLoading, isError, data:myData} = getMyPageData;

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <UserBanner myData={myData} setCategory={setCategory} />
        {!category ?
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
          :
          <div className={styles.inner_box}>
            <div className={styles.annual}>
              <p className={styles.title}>비밀번호 수정</p>
              <Password />
            </div>
          </div>
        }
      </div>

    </div>
  );
}
