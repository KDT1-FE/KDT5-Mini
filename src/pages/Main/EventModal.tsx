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
      <div className='detail-wrap'>      
        <h1 className='detail-header'>일정 상세</h1>
      <h2 className='detail-name'>{eventInfo.title}</h2>
      <p className='detail-title'>
        <span>제목:</span>{eventInfo.start.toISOString()}</p>
      <p className='detail-date'><span>기간:</span>{eventInfo.end.toISOString()}</p>
      <p className='detail-category'><span>종류:</span>

      <div className='detail-duty'>
      <span>• 당직</span>
      </div>
      <div className='detail-rest'>
      <span>• 연차</span>
      </div>{eventInfo.category}</p>
      <button 
      className='detail-close'
      onClick={closeModal}>✖</button>
      </div>

    </Modal>
  );
};

export default EventModal;
