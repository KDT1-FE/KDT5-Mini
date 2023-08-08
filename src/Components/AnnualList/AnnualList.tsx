import dayjs from "dayjs";
import styles from "./annualList.module.scss";
import { DateCount } from "@/Common/CommonFunction.ts";
import { useState } from "react";
import Modal from '@/Components/Modal/Modal';


export default function AnnualList(props: { myData?: MyDataType}) {
  const [visibility, setVisible] = useState(false)
  const [editingAnnual, setEditingAnnual] = useState< MyAnnualType | null>(null);
  const [reason, setReason] = useState("")
  const annuals = props.myData?.annualHistories || [];

  function closeModal() {
    setVisible(!visibility)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingAnnual) {
      setEditingAnnual(prevAnnual => ({
        ...prevAnnual,
        [name]: value
      }));
    }
  };

  const handleClick = (e: React.MouseEvent <HTMLDivElement, MouseEvent>)=>{
    e.stopPropagation()
    setVisible(true)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    console.log(e.target);
  }

  return (
    <div className={styles.Container}>
      <div className={styles.index}>
        <span className={styles.index_title}>사유</span>
        <span className={styles.index_title}>제목</span>
        <span className={styles.index_title}>사용 기간</span>
        <span className={styles.index_title}>사용 개수</span>
        <span className={styles.index_title}>상태</span>
      </div>
      <div
        className={styles.lists_content}>
        {annuals?.map((annual, index) => (
          <div
            onClick={handleClick}
            key={index}
            className={styles.lists} >
            <div className={styles.list}>{annual.reason}</div>
            <div className={styles.list}>{annual.title}</div>
            <div className={styles.list}>
              <span>{dayjs(annual.startDate).format("YYYY/MM/DD")}</span>~
              <span>{dayjs(annual.endDate).format("YYYY/MM/DD")}</span>
            </div>
            <div className={styles.list}>{DateCount({
              startDate: annual.startDate,
              endDate: annual.endDate
            })} 개</div>
            <p className={styles.list}>{annual.status}</p>
            <Modal
              visibility={visibility} toggle={setVisible}>
              <div className="addEvent-wrap">
                <h1 className="addEvent-header">일정 등록</h1>
                <div className="addEvent-title">
                  <label>제목</label>
                  <input
                    type="text"
                    name="title"
                    value={annual.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addEvent-start">
                  <label>시작일</label>
                  <input
                    type="date"
                    name="startDate"
                    value={annual.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addEvent-end">
                  <label>종료일</label>
                  <input
                    type="date"
                    name="endDate"
                    value={annual.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addEvent-reason">
                  <label>사유</label>
                  <select
                    name="select-reason" id="reason"
                    onChange={handleInputChange}
                  >
                    <option value={""}>========== 선택하세요 ==========</option>
                    <option value="연차유급 휴가">연차유급 휴가</option>
                    <option value="병가 휴가">병가 휴가</option>
                    <option value="경조사 휴가">경조사 휴가</option>
                    <option value="출산 전휴 휴가">출산 전휴 휴가</option>
                    <option value="기타 휴가">기타 휴가</option>
                    <option value={annual.reason} selected>{annual.reason}</option>
                  </select>
                </div>
                <div className="btn-group">
                  <button onClick={closeModal}>수 정</button>
                  <button onClick={handleSubmit}>삭 제</button>
                </div>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
