import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <p className={styles.title}>연차/당직 프로젝트</p>
    </div>
  );
}
