// import React, { useState, useEffect } from "react";
import styles from "./admin.module.scss";
import Header from "../../Components/Header/Header.tsx";
import DutyLists from "../../Components/AdminPage/DutyLists.tsx";
import DayoffLists from "../../Components/AdminPage/DayoffLists.tsx";
import { AdminListsAll } from "src/@types/adminList.ts";
// import { useState, useEffect } from "react";

export default function Admin() {
  // const cookie = new Cookies();
  // const AC_TOKEN = cookie.get("AC_TOKEN");
  
  // const [monsters, setMonsters] = useState([]);
  // useEffect(() => {
  //   fetch(“작고 소중한 오픈 API 주소 :데스크톱_컴퓨터: “, {
  //     method: “GET”,
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
        <Header />
        <div className={styles.container}>
          <header className={styles.admin_info}>
            <div className={styles.admin_name}>
              <span className={styles.admin_id}>데이터</span>
              <span>관리자</span>
            </div>
            <div className={styles.search_box}>
              <span className={styles.search_option}>
                <button>이름</button>
                <button className={styles.btn}>제목</button>
              </span>
              <div className={styles.search_bar}>
                <input
                  className={styles.search_input}
                  type="text"
                  placeholder="검색..."
                />
                <img
                  className={styles.search_icon}
                  src="../../assets/search_icon.png"
                  alt="search icon"
                />
              </div>
            </div>
          </header>
          <div className={styles.list_info}>
            <section className={styles.lists_box}>
              <div className={styles.lists_title}>연차 내역</div>
              <div className={styles.lists_index}>
                <span className={styles.name}>상신인</span>
                <span className={styles.title}>제목</span>
                <span className={styles.period}>사용 날짜</span>
                <span className={styles.count}>개수</span>
                <span className={styles.permission}>상태</span>
              </div>
              <ul className={styles.lists}>
                {/* <DayoffLists key={index} item={item} /> */}
              </ul>
            </section>
            <section className={`${styles.lists_box} ${styles.duty_box}`}>
              <div className={styles.lists_title}>당직 내역</div>
              <div className={styles.lists_index}>
                <span className={styles.duty_name}>상신인</span>
                <span className={styles.duty_title}>제목</span>
                <span className={styles.duty_period}>사용 날짜</span>
                <span className={styles.duty_permission}>상태</span>
              </div>
              <ul className={styles.lists}>
                <DutyLists />
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
