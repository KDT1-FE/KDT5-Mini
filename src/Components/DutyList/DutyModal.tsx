import { ChangeEvent, useState } from "react";
import useDataQuery from "@/Hooks/useData-Query.tsx";
import Modal from "@/Components/Modal/Modal.tsx";

export default function DutyModal(props: { duty?: DutyType, id:number, visivility:boolean , setVisivility:(value:boolean)=>void }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const {changeMyData, deleteMyData} = useDataQuery();

  const dutyItem = props.duty;
  const id = props.id;
  const visivility = props.visivility;
  const setVisivility = props.setVisivility;

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
        setVisivility(false);
      }
    });
  };

  const handleDelete = async () =>{
    deleteMyData.mutate(id,{
      onSuccess:()=>{
        setEdit(false);
        setVisivility(false);
      }
    });
  }

  return (
    <>
      <Modal
        visibility={visivility} toggle={setVisivility}>
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
              <span onClick={handleEdit}>{dutyItem?.title}</span>
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
              <span onClick={handleEdit}>{dutyItem?.startDate}</span>
            )}
          </div>
          <div className="btn-group">
            <button onClick={handleDelete}>삭 제</button>
            <button onClick={handleSubmit}>수 정</button>
          </div>
        </div>
      </Modal>
    </>
  )
}
