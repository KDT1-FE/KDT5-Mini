import styles from "./DayoffList.module.scss";

import { AdminListsAll } from "src/@types/adminList.ts";

interface Props {
  item: AdminListsAll;
}

export default function DayoffList({ item }: Props) {
  const listData = item;
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
