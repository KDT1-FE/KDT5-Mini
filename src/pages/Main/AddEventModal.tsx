import React, { useState } from 'react';
import Modal from 'react-modal';
import "./AddEventModal.scss";
import axios from 'axios';


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
  reason: string; 
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, closeModal, handleAddEvent }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    category: '',
    reason: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    // name이 'select-reason'인 경우, reason 값을 설정
    if (name === 'select-reason') {
      setNewEvent((prevEvent) => ({ ...prevEvent, reason: value }));
    } else {
      setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    }
  };
  

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked ? '연차' : '당직';
    setNewEvent((prevEvent) => ({ ...prevEvent, category: value }));
  };
  const handleSubmit = () => {

    handleAddEvent(newEvent);
  
    const eventDataToSend = {
      ...newEvent,
      reason: newEvent.reason,
    };

     axios.post('http://52.78.200.157/api/annual', eventDataToSend)
      .then(response => {
        console.log('Event successfully submitted:', response.data);
      })
      .catch(error => {
        console.error('Error submitting event:', error);
      });

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
          <label
                        className='addRest'>
            <input
              type="checkbox"
              name="category"
              value="연차"
              checked={newEvent.category === '연차'}
              onChange={handleCategoryChange}
            />
            연차
          </label>
          <label
                        className='addDuty'>
            <input
              type="checkbox"
              name="category"
              value="당직"

              checked={newEvent.category === '당직'}
              onChange={handleCategoryChange}
            />
            당직
          </label>
        </div>
        <div className='addEvent-reason'>
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
