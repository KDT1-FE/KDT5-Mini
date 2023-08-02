// import React from "react";
import styles from "./DayoffList.module.scss";
// import my from "../../API/data/my.json";

export default function DayoffList() {
  return (
    // <div>
    //   {my.map((item) => (
    //     <div key={item.name}>
    //       {item.annual.map((annualItem) => (
    //         <li key={annualItem.id} className={styles.list}>
    //           <span className={styles.list_option}>
    //             <span className={`${styles.text} ${styles.name}`}>
    //               {item.name}
    //             </span>
    //             {/* 각각의 annualItem에서 원하는 정보를 렌더링하도록 로직 추가 */}
    //             <span className={`${styles.text} ${styles.title}`}>
    //               {annualItem.reason}
    //             </span>
    //             <span className={`${styles.text} ${styles.period}`}>
    //               {annualItem.startDate} ~ {annualItem.endDate}
    //             </span>
    //           </span>
    //           <button className={styles.permission}>
    //             {annualItem.status === "대기" ? "결재 대기" : "완료"}
    //           </button>
    //         </li>
    //       ))}
    //     </div>
    //   ))}
    // </div>
    <li className={styles.list}>
      <span className={styles.list_option}>
        <span className={`${styles.text} ${styles.name}`}>이름</span>
        <span className={`${styles.text} ${styles.title}`}>제목</span>
        <span className={`${styles.text} ${styles.period}`}>
          2023 / 7 / 29 ~ 2023 / 7 / 30
        </span>
        <span className={`${styles.text} ${styles.count}`}>2개</span>
      </span>
      <button className={styles.permission}>결재 대기</button>
    </li>
  );
}
