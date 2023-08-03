import dayjs from "dayjs";
import { DateCount } from "@/Common/CommonFunction.ts";
import { useAnnualStore, useMyStore } from "@/Store/store.ts";
import styles from "./annualList.module.scss";

export default function AnnualList({ name }: { name: string }) {
  const user = useMyStore((state) =>
    state.data.find((user) => user.name === name),
  );
  const setCount = useAnnualStore((state) => state.setCount);
  let totalCount = 0;
  console.log(user);

  user?.annual.forEach((annual) => {
    const count = Number(
      DateCount({ startDate: annual.startDate, endDate: annual.endDate }),
    );
    totalCount = totalCount + count;
  });
  setCount(totalCount);
  return (
    <div className={styles.Container}>
      <div className={styles.index}>
        <span className={styles.index_title}>사유</span>
        <span className={styles.index_title}>제목</span>
        <span className={styles.index_title}>사용 기간</span>
        <span className={styles.index_title}>사용 개수</span>
        <span className={styles.index_title}>상태</span>
      </div>
      <div className={styles.lists_content}>
        {user?.annual.map((annualItem: AnnualType) => (
          <div key={annualItem.id} className={styles.lists}>
            <div className={styles.list}>{annualItem.reason}</div>
            <div className={styles.list}>{annualItem.title}</div>
            <div className={styles.list}>
              <span>{dayjs(annualItem.startDate).format("YYYY/MM/DD")}</span>~
              <span>{dayjs(annualItem.endDate).format("YYYY/MM/DD")}</span>
            </div>
            <div className={styles.list}>
              {DateCount({
                startDate: annualItem.startDate,
                endDate: annualItem.endDate,
              })}{" "}
              개
            </div>
            <p className={styles.list}>{annualItem.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
