import styles from "./DayoffList.module.scss";
import { AdminListsAll } from "src/@types/adminList.ts";

interface Props {
  item: AdminListsAll;
}

export default function DayoffList({ item }: Props) {
  const listData = item;
  return (
    <li key={item.name} className={styles.list}>
      <span className={styles.list_option}>
        <span className={`${styles.text} ${styles.name}`}>{listData.name}</span>
        {/* Add the necessary logic to get the title and period */}
        <span className={`${styles.text} ${styles.title}`}>
          {listData.title}
        </span>
        <span className={`${styles.text} ${styles.period}`}>
          {listData.startDate}-{listData.endDate}
        </span>
        {/* Add the necessary logic to get the count */}
        <span className={`${styles.text} ${styles.count}`}>
          {listData.reason}
        </span>
      </span>
      <button className={styles.permission}>결재 대기</button>
    </li>
  );
}
