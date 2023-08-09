import UserBanner from "@/Components/userBanner/UserBanner.tsx";
import AnnualList from "@/Components/AnnualList/AnnualList.tsx";
import Header from "../../Components/Header/Header.tsx";
import DutyList from "@/Components/DutyList/DutyList.tsx";
import styles from "./mypage.module.scss";
import { useEffect, useState } from "react";
import { getMyPage } from "@/Api/apis";
import Password from "@/Components/Password/password.tsx";

export default function Mypage() {
  const [myData, setMyData] = useState<MyDataType>();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(false);

  useEffect(() => {
    async function fetchMyData() {
      try {
        const data = await getMyPage(); // 사용자 데이터 가져오기
        setMyData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchMyData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
