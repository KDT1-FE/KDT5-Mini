import styles from "./admin.module.scss";
import Header from "../../Components/Header/Header.tsx";
import DutyList from "../../Components/AdminPage/DutyList";
import DayoffList from "../../Components/AdminPage/DayoffList";
// import { useState, useEffect } from "react";

export default function Admin() {
  // const [monsters, setMonsters] = useState([]);

  // useEffect(() => {
  //   fetch("작고 소중한 오픈 API 주소 🖥 ", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setMonsters(res);
  //     });
  // }, []);

  // const handleChange = (e) => {
  //   setUserInput(e.target.value);
  // };
  return (
    <>
      <div className={styles.page}>
        <Header></Header>
        <div className={styles.container}>
          <header className={styles.admin_info}>
            <div className={styles.admin_name}>
              <span className={styles.admin_id}>데이터</span>
              <span>관리자</span>
            </div>
            <div className={styles.search_box}>
              <span className={styles.search_option}>
                <button>이름</button>
                <button className={styles.btn}>직급</button>
              </span>
              <input
                className={styles.search_bar}
                type="text"
                placeholder="검색"
              />
            </div>
          </header>
          <div className={styles.list_info}>
            <section className={`${styles.lists_box} ${styles.dayoff_box}`}>
              <div className={styles.lists_title}>연차 내역</div>
              <div className={styles.lists_index}>
                <span>상신인</span>
                <span>사용 날짜</span>
                <span>개수</span>
                <span>상태</span>
              </div>
              <ol className={styles.lists}>
                <DayoffList></DayoffList>
                <DayoffList></DayoffList>
                <DayoffList></DayoffList>
                <DayoffList></DayoffList>
              </ol>
            </section>
            <section className={`${styles.lists_box} ${styles.duty_box}`}>
              <div className={styles.lists_title}>당직 내역</div>
              <div className={styles.lists_index}>
                <span>상신인</span>
                <span>사용 날짜</span>
                <span>상태</span>
              </div>
              <ol className={styles.lists}>
                <DutyList></DutyList>
                <DutyList></DutyList>
                <DutyList></DutyList>
                <DutyList></DutyList>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
