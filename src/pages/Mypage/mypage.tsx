// import useDataQuery from "../../Hooks/useData-Query.tsx";
import UserBanner from "@/Components/userBanner/UserBanner.tsx";
import AnnualList from "@/Components/AnnualList/AnnualList.tsx";
import Header from "../../Components/Header/Header.tsx";
import DutyList from "@/Components/DutyList/DutyList.tsx";
import styles from "./mypage.module.scss";
import useDataQuery from "@/Hooks/useData-Query.tsx";


export default function Mypage() {
  const {getMyPageData} = useDataQuery()
  const {isLoading, error, data:myData} = getMyPageData

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }
  const handleClick = (e: React.MouseEvent <HTMLDivElement, MouseEvent>)=>{
    console.log(e.target);
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <UserBanner myData={myData} />
        <div className={styles.inner_box}>
          <div className={styles.annual}>
            <p className={styles.title}>연차 리스트</p>
            <AnnualList myData={myData} handleClick={handleClick}  />
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
