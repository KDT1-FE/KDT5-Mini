// import React from 'react'
import styles from "./DutyLists.module.scss";

export default function DutyLists() {
  return (
    <li className={styles.list}>
      <span className={styles.list_option}>
        <span className={`${styles.text} ${styles.name}`}>이름</span>
        <span className={`${styles.text} ${styles.title}`}>제목</span>
        <span className={`${styles.text} ${styles.period}`}>2023 / 7 / 31</span>
      </span>
      <button className={styles.permission}>결재 대기</button>
    </li>
  );
}
