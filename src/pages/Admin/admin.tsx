import React, { useState, useEffect } from "react";
import styles from "./admin.module.scss";
import Header from "../../Components/Header/Header.tsx";
import DutyLists from "../../Components/AdminPage/DutyLists.tsx";
import DayoffLists from "../../Components/AdminPage/DayoffLists.tsx";
import { AdminListsAll } from "src/@types/adminList.ts";
import { getListAll } from "../..//Api/apis.ts";
import { Cookies } from "react-cookie";

export default function Admin() {
  const [dayoffData, setDayoffData] = useState<AdminListsAll[]>([]);
  const [dutyData, setDutyData] = useState<AdminListsAll[]>([]);

  useEffect(() => {
    async function fetchListData() {
      try {
        const data = await getListAll();
        // 연차와 당직으로 분리
        const dayoffItems = data.filter(
          (item: AdminListsAll) => item.category === "연차",
        );
        const dutyItems = data.filter(
          (item: AdminListsAll) => item.category === "당직",
        );
        setDayoffData(dayoffItems);
        setDutyData(dutyItems);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    }
    fetchListData();
  }, []);

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
                <span className={styles.reason}>사유</span>
                <span className={styles.period}>사용 기간</span>
                <span className={styles.count}>사용 일수</span>
                <span className={styles.permission}>상태</span>
              </div>
              <ul className={styles.lists}>
                {/* dayoffData 상태는 AdminListsAll 타입의 배열로 정의 */}
                {dayoffData.map((item) => (
                  <DayoffLists key={item.id} item={item} />
                ))}
              </ul>
            </section>
            <section className={`${styles.lists_box} ${styles.duty_box}`}>
              <div className={styles.lists_title}>당직 내역</div>
              <div className={styles.lists_index}>
                <span className={styles.duty_name}>상신인</span>
                <span className={styles.duty_title}>제목</span>
                <span className={styles.duty_period}>사용 기간</span>
                <span className={styles.duty_permission}>상태</span>
              </div>
              <ul className={styles.lists}>
                {dutyData.map((item) => (
                  <DutyLists key={item.id} item={item} />
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
