import styles from "./mypage.module.scss";


export default function Mypage() {
  /*
  - 개인별
    1. 연차 목록을 리스트 한다.
    2. 당직 목록을 리스트 한다.
    3. 수정, 삭제 기능을 추가한다.
  */
  return (
    <>
      <div className={styles.section}>
        <h1>MyPage</h1>
      </div>
    </>
  );
}
