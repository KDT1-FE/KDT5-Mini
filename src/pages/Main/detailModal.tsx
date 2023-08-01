import React from 'react';

const DetailModal = ({ selectedEvent, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>일정 상세</h1>
        <p>제목: {selectedEvent.title}</p>
        <p>기간: {selectedEvent.start} ~ {selectedEvent.end}</p>
        <p>종류: {selectedEvent.reason}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default DetailModal;