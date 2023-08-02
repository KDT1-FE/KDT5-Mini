import { DateCount, JickCounter } from "@/Common/CommonFunction.ts";
import { useAnnualStore, useUserStore } from "@/Store/store.ts";
import dayjs from "dayjs";
import styles from "./userBanner.module.scss";

export default function UserBanner({ name }: { name: string }) {
  const { users } = useUserStore(state => state);
  const { count } = useAnnualStore(state => state);
  const user = users.find(user => name === user.name);
  const today = dayjs().format("YYYY-MM-DD");
  const totalDays = DateCount({ startDate: user?.joinDate as string, endDate: today });
  const jik = JickCounter(totalDays as string);
  const restAnnual = jik.annualBalance - count;
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p className={styles.list}> 상신 내역 </p>
        <p className={styles.personal_info}> 개인정보 수정 </p>
      </div>
      <div className={styles.banner}>
        <div className={styles.personal}>
          <p className={styles.Name}>{user?.name}</p>
          <p className={styles.answer}>{jik.answer}</p>
        </div>
        <div className={styles.annual}>
          <p className={styles.annualTitle}>총 연차 날 수 : </p>
          <p className={styles.annualTotal}>{jik.annualBalance}</p>
          <p className={styles.annualTotalTitle}>개</p>
        </div>
        <div className={styles.annualUse}>
          <p className={styles.annualUseTitle}>총 사용 연차 :</p>
          <p className={styles.annualUseCount}>{count} </p>
          <p className={styles.annualUseCountTitle}> 일 </p>
        </div>
        <div className={styles.restAnnual}>
          <p className={styles.restAnnualTitle}>잔여연차 :</p>
          <p className={styles.restAnnualTitleTotal}>{restAnnual}</p>
        </div>
      </div>
    </div>
  );
}
