import React, { useState } from 'react';
import Modal from 'react-modal';
import "./AddEventModal.scss";

interface AddEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleAddEvent: (newEvent: NewEvent) => void; // NewEvent 타입으로 수정
}

interface NewEvent {
  title: string;
  startDate: string;
  endDate: string;
  category: string;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, closeModal, handleAddEvent }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    category: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = () => {
    // Perform validation if needed
    // ...

    // Call the handleAddEvent function with the newEvent data
    handleAddEvent(newEvent);

    // Close the modal
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
      <div className='addEvent-wrap'>
        <h1 className='addEvent-header'>일정 등록</h1>
        <div className='addEvent-title'>
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='addEvent-start'>
          <label>시작일</label>
          <input
            type="date"
            name="startDate"
            value={newEvent.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className='addEvent-end'>
          <label>종료일</label>
          <input
            type="date"
            name="endDate"
            value={newEvent.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className='addEvent-category'>
          <label>종류</label>
          <input
            type="text"
            name="category"
            value={newEvent.category}
            onChange={handleInputChange}
          />
        </div>
        <div className='addEvent-reason'>
          <label>사유</label> 
          <select name="select-reason" id="reason">
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
