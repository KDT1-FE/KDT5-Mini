import styles from "./DayoffLists.module.scss";
import { useState } from "react";
import { AdminListsAll } from "@/@types/adminList.ts";

interface Props {
  item: AdminListsAll;
}

export default function DayoffLists({ item }: Props) {
  const [status, setStatus] = useState(item.status);
  // const listData = item;

  const calculateUsedDays = () => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const usedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // 1을 더하여 마지막 날을 포함

    return usedDays;
  };

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
        <span className={`${styles.text} ${styles.title}`}>{item.title}</span>
        <span className={`${styles.text} ${styles.reason}`}>{item.reason}</span>
        <span className={`${styles.text} ${styles.period}`}>
          {item.startDate} - {item.endDate}
        </span>
        <span className={`${styles.text} ${styles.count}`}>
          {calculateUsedDays()}일
        </span>
      </span>
      <button
        className={`${styles.permission} ${
          status === "결재 완료" ? styles.checked : ""
        }`}
        onClick={handlePermissionClick}
        disabled={status === "결재 완료"}
      >
        {item.status}
      </button>
    </li>
  );
}
