import React, { useState } from "react";
import "./AddEventModal.scss";
import Modal from "react-modal";
import { ApiHttp } from "@/Api/apis.ts";
import { Cookies } from "react-cookie";


const cookie = new Cookies;
const accessToken = cookie.get('accessToken');



interface AddEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleAddEvent: (newEvent: NewEvent) => void;
}

interface NewEvent {
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  reason: string;
  name: string;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, closeModal, handleAddEvent }) => {
  const [events, setEvents] = useState<NewEvent[]>([]); // events 상태 변수 추가

  const [newEvent, setNewEvent] = useState<NewEvent>({
    category: "",
    email: "",
    endDate: "",
    name: "",
    reason: "",
    startDate: "",

  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;


    // name이 'select-reason'인 경우, reason 값을 설정
    if (name === "select-reason") {

      setNewEvent((prevEvent) => ({ ...prevEvent, reason: value }));
    } else {
      setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewEvent((prevEvent) => ({
      ...prevEvent,

      category: value,
    }));
  };

  const handleSubmit = async () => {
    const eventDataToSend = {
      ...newEvent, // 이벤트 등록 폼에서 입력한 값
      id: events.length + 1, // 새 이벤트의 ID (기존 이벤트 개수 + 1)

    };

    try {
      // 서버에 새 이벤트 등록 요청 보내기
      const response = await ApiHttp.post('/api/annual', eventDataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Event successfully submitted:', response.data);

      // 새 이벤트를 현재 이벤트 목록에 추가하기
      setEvents([...events, eventDataToSend]);

      // 이벤트 등록에 성공한 경우, 추가 작업을 수행하거나 사용자에게 알림을 표시할 수 있음
    } catch (error) {
      console.error('Error submitting event:', error);
      // 이벤트 등록에 실패한 경우, 에러 처리 로직을 수행하거나 사용자에게 알림을 표시할 수 있음
    }


    closeModal();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Event Modal"
      overlayClassName="custom-overlay"
      className="custom-modal-content"
    >
      <div className="addEvent-wrap">
        <h1 className="addEvent-header">일정 등록</h1>
        <div className="addEvent-title">
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="addEvent-start">
          <label>시작일</label>
          <input
            type="date"
            name="startDate"
            value={newEvent.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="addEvent-end">
          <label>종료일</label>
          <input
            type="date"
            name="endDate"
            value={newEvent.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="addEvent-category">
          <label>종류</label>

          <div className="addCategory-wrap">

            <label
              className="addRest">
              <input
                type="checkbox"
                name="category"
                value="연차"
                checked={newEvent.category === "연차"}
                onChange={handleCategoryChange}
              />
              연차
            </label>
            <label
              className="addDuty">
              <input
                type="checkbox"
                name="category"
                value="당직"
                checked={newEvent.category === "당직"}
                onChange={handleCategoryChange}
              />
              당직
            </label>
          </div>

        </div>
        <div className="addEvent-reason">
          <label>사유</label>
          <select name="select-reason" id="reason" onChange={handleInputChange}>
            <option value="">========== 선택하세요 ==========</option>
            <option value="연차유급 휴가">연차유급 휴가</option>
            <option value="병가 휴가">병가 휴가</option>
            <option value="경조사 휴가">경조사 휴가</option>
            <option value="출산 전휴 휴가">출산 전휴 휴가</option>
            <option value="기타 휴가">기타 휴가</option>
          </select>
        </div>
        <div className="btn-group">
          <button onClick={closeModal}>닫기</button>
          <button onClick={handleSubmit}>등록</button>
        </div>
      </div>

    </Modal>
  );
};
export default AddEventModal;