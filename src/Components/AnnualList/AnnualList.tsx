import dayjs from "dayjs";
import { DateCount } from "@/Common/CommonFunction.ts";
import { useAnnualStore, useMyStore } from "@/Store/store.ts";
import styles from "./annualList.module.scss";

export default function AnnualList({ name }: { name: string }) {
  const user =
    useMyStore(state => state.data.find(user => user.name === name));
  const setCount = useAnnualStore(state => state.setCount);
  let totalCount = 0;
  console.log(user);

  user?.annual.forEach((annual) => {
    const count = Number(DateCount({ startDate: annual.startDate, endDate: annual.endDate }));
    totalCount = totalCount + count;
  });
  setCount(totalCount);
  return (
    <div className={styles.annualContainer}>
      <div>
        <div className={styles.annualContainerTitle}>
          <p className={styles.item}>사유</p>
          <p className={styles.item}>사용 기간</p>
          <p className={styles.item}>상태</p>
          <p className={styles.item}>사용 개수</p>
        </div>
        {user?.annual.map((annualItem: AnnualType) => (
          <div key={annualItem.id} className={styles.list}>
              <div>{annualItem.reason}</div>
              <span>
                <span>{dayjs(annualItem.startDate).format("YYYY/MM/DD")}</span>~
                <span>{dayjs(annualItem.endDate).format("YYYY/MM/DD")}</span>
              </span>
              <div>{DateCount({ startDate: annualItem.startDate, endDate: annualItem.endDate })}</div>
              <p>{annualItem.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
