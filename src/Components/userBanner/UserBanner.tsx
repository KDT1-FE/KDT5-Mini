import { DateCount, JickCounter } from "@/Common/CommonFunction.ts";
import { useAnnualStore, useUserStore } from "@/Store/store.ts";
import dayjs from "dayjs";
import styles from "./userBanner.module.scss";

export default function UserBanner({ name }: { name: string }) {
  const { users } = useUserStore((state) => state);
  const { count } = useAnnualStore((state) => state);
  const user = users.find((user) => name === user.name);
  const today = dayjs().format("YYYY-MM-DD");
  const totalDays = DateCount({
    startDate: user?.joinDate as string,
    endDate: today,
  });
  const jik = JickCounter(totalDays as string);
  const restAnnual = jik.annualBalance - count;
  return (
    <div className={styles.container}>
      <div className={styles.my_menu}>
        <span >상신 내역</span>
        <span className={styles.bar}>|</span>
        <span className={styles.my_profile}>개인정보 수정</span>
      </div>
      <div className={styles.banner}>
        <div className={`${styles.banner_box} ${styles.annual_info}`}>
          <p className={styles.user_info}>
            <span className={styles.user_name}>{user?.name} </span>
            <span className={styles.user_position}>{jik.answer}</span>
          </p>
          <span className={styles.user_text}>KDT-5 회원정보</span>
        </div>
        <div className={`${styles.banner_box} `}>
          <p className={styles.total_count}>
            <span className={styles.total_num}>{jik.annualBalance}</span>
            <span className={styles.total_unit}>개</span>
          </p>
          <span className={styles.total_text}>총 발생 연차</span>
        </div>
        <div className={`${styles.banner_box} ${styles.used_annual}`}>
          <p className={styles.total_count}>
            <span className={styles.total_num}>{count}</span>
            <span className={styles.total_unit}>개</span>
          </p>
          <span className={styles.total_text}>총 사용 연차</span>
        </div>
        <div className={`${styles.banner_box} ${styles.rest_Annual}`}>
          <p className={styles.total_count}>
            <span className={styles.total_num}>{restAnnual}</span>
            <span className={styles.total_unit}>개</span>
          </p>
          <span className={styles.total_text}>총 잔여 연차</span>
        </div>
      </div>
    </div>
  );
}
