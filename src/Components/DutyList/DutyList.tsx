import { useMyStore } from "@/Store/store.ts";
import styles from "@/Components/DutyList/dutyList.module.scss";

export default function DutyList({ name }: { name: string }) {
  const user =
    useMyStore(state => state.data.find(user => user.name === name));
  return (
    <div className={styles.dutyContainer}>
      <div>
        <div className={styles.dutyContainerTitle}>
          <p className={styles.item}>사용 기간</p>
          <p className={styles.item}>상태</p>
        </div>
        <div>
          {user?.duty.map((dutyItem: DutyType) => (
            <div key={dutyItem.id} className={styles.list}>
              <div>
                {dutyItem.startDate}
              </div>
              <div>
                {dutyItem.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
