import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <p className={styles.title}>우리도 한번 놀아보자!</p>
    </div>
  );
}
