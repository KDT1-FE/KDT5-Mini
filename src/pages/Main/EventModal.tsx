import React from 'react';
import Modal from 'react-modal';
import "./EventModal.scss";


interface EventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  eventInfo: {
    title: string;
    start: Date;
    end: Date;
    category: string;
  };
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, closeModal, eventInfo }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Modal"
      overlayClassName="custom-overlay"
      className="custom-modal-content" 
    >
      <h1>일정 상세</h1>
      <h2>{eventInfo.title}</h2>
      <p>{eventInfo.start.toISOString()}</p>
      <p>{eventInfo.end.toISOString()}</p>
      <p>{eventInfo.category}</p>
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};

export default EventModal;
