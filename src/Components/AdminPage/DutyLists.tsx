import styles from "./DutyLists.module.scss";
import { useState, useEffect } from "react";
import { AdminListsAll } from "src/@types/adminList.ts";

interface Props {
  item: AdminListsAll;
}

export default function DutyLists({ item }: Props) {
  const [status, setStatus] = useState(item.status);
  // const listData = item;

  const handlePermissionClick = () => {
    if (status === "결재 대기") {
      setStatus("결재 완료");
      // 여기에 상태 업데이트를 위한 API 호출 추가
    }
  };

  return (
    <li key={item.id} className={styles.list}>
      <span className={styles.list_option}>
        <span className={`${styles.text} ${styles.name}`}>{item.name}</span>
        <span className={`${styles.text} ${styles.title}`}>{item.title}.</span>
        <span className={`${styles.text} ${styles.period}`}>
          {item.startDate}
        </span>
      </span>
      <button
        className={`${styles.permission} ${
          status === "결재 완료" ? styles.checked : ""
        }`}
        onClick={handlePermissionClick}
        disabled={status === "결재 승인"}
      >
        {item.status}
      </button>
    </li>
  );
}
