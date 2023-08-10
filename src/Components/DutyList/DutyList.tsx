// import { useMyStore } from "@/Store/store.ts";
import styles from "@/Components/DutyList/dutyList.module.scss";
import Modal from "@/Components/Modal/Modal.tsx";
import { ChangeEvent, useState } from "react";
import useDataQuery from "@/Hooks/useData-Query.tsx";

export default function DutyList(props:{myData:MyDataType|undefined}) {
  const [visibility, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [id, setId] = useState(0);
  const {changeMyData, deleteMyData} = useDataQuery();
  const dutyData = props.myData?.dutyHistories || [];

  const closeModal = () => {
    setVisible(false);
  };
  const handleClick = (id: number) => {
    setVisible(true);
    setId(id)
  };
  const handleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEdit(true);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "startDate") {
      setStart(e.target.value);
    }
  };
  const handleSubmit = async () => {
    const data: UpdateType = { id: id, title:title, startDate: start, endDate: start, reason:"기타휴가" };
    changeMyData.mutate(data,{
      onSuccess:()=>{
        setEdit(false);
        setVisible(false);
      }
    });

    // await postUpdate(data)
    //   .then((res) => console.log(res));
    // setEdit(false);

  };

  const handleDelete = async () =>{
    deleteMyData.mutate(id,{
      onSuccess:()=>{
        setEdit(false);
        setVisible(false);
      }
    });
    // await postDelete( id )
    //   .then((res) => console.log(res));
    // setEdit(false);
    // setVisible(false);
  }
  return (
    <div className={styles.container}>
      <div className={styles.index}>
        <p className={styles.index_title}>사유</p>
        <p className={styles.index_title}>제목</p>
        <p className={styles.index_title}>사용 날짜</p>
        <p className={styles.index_title}>상태</p>
      </div>
      <div className={styles.lists_content}>
        {dutyData?.map((dutyItem) => (
          <div
            onClick={() => handleClick(dutyItem.id)}
            key={dutyItem.id}
            className={styles.lists}>
            <div>당직</div> 
            <div>{dutyItem.title}</div>
            <div>{dutyItem.startDate}</div>
            <div>{dutyItem.status}</div>
            <Modal
              visibility={visibility} toggle={setVisible}>
              <div className="addEvent-wrap">
                <h1 className="addEvent-header">일정 등록</h1>
                <div className="addEvent-title">
                  <label>제목</label>
                  {edit ? (
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onClick={handleEditClick}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span onClick={handleEdit}>{dutyItem.title}</span>
                  )}
                </div>
                <div className="addEvent-start">
                  <label>시작일</label>
                  {edit ? (
                    <input
                      type="date"
                      name="startDate"
                      value={start}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span onClick={handleEdit}>{dutyItem.startDate}</span>
                  )}
                </div>
                <div className="btn-group">
                  <button onClick={closeModal}>닫 기</button>
                  <button onClick={handleDelete}>삭 제</button>
                  <button onClick={handleSubmit}>수 정</button>
                </div>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
