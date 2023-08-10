import UserBanner from "@/Components/userBanner/UserBanner.tsx";
import AnnualList from "@/Components/AnnualList/AnnualList.tsx";
import Header from "../../Components/Header/Header.tsx";
import DutyList from "@/Components/DutyList/DutyList.tsx";
import styles from "./mypage.module.scss";
import { useState } from "react";
import Password from "@/Components/Password/Password.tsx";
import useDataQuery from "@/Hooks/useData-Query.tsx";

export default function Mypage() {
  // const [myData, setMyData] = useState<MyDataType>();
  // const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(false);
  const { getMyPageData } = useDataQuery();
  const { isLoading, isError, data: myData } = getMyPageData;

  // useEffect(() => {
  //   async function fetchMyData() {
  //     try {
  //       const data = await getMyPage(); // 사용자 데이터 가져오기
  //       setMyData(data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchMyData();
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <UserBanner
          myData={myData}
          category={category}
          setCategory={setCategory}
        />
        {!category ? (
          <div className={styles.list_box}>
            <div className={styles.annual}>
              <p className={styles.title}>연차 내역</p>
              <AnnualList myData={myData} />
            </div>
            <div className={styles.duty}>
              <p className={styles.title}>당직 내역</p>
              <DutyList myData={myData} />
            </div>
          </div>
        ) : (
          <div className={styles.profile_box}>
            <p className={styles.title}>비밀번호 변경</p>
            <Password />
          </div>
        )}
      </div>
    </div>
  );
}
