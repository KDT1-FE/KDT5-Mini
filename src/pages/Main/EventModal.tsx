import React from 'react';
import Modal from 'react-modal';
import "./EventModal.scss";

interface EventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  event: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _def: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _instance: any;
    reason: string;
    title: string;
    startDate: string;
    endDate: string;
    category: string;
    name: string;
  };
  
}const EventModal: React.FC<EventModalProps> = ({ isOpen, closeModal, event }) => {
  const category = event._def.extendedProps.category;
  const startDate = event._instance.range.start;
  const endDate = event._instance.range.end;

  const isDutyCategory = category === "당직";
  const isAnnualLeaveCategory = category === "연차";

  console.log(event);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (date: any) => {
    const options = {
      year: 'numeric',
      month: 'long', // 'short' 또는 'numeric' 등으로 변경 가능
      day: 'numeric',
    };
    return date.toLocaleDateString('ko', options);
  };




  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Modal"
      overlayClassName="custom-overlay"
      className="detail-custom-modal-content" 
    >
      <div className='detail-wrap'>      
        <h1 className='detail-header'>일정 상세</h1>
        <h2 className='detail-name'>{event.title}</h2> {/* 수정된 부분 */}
        <p className='detail-title'>
          <span>제목:</span> {event.reason}</p>
        <p className='detail-date'><span>기간:</span>
        {formatDate(startDate)} ~ {formatDate(endDate)}</p>
        <p className='detail-category'><span>종류:</span>

        {isDutyCategory && (
          <div className='detail-duty'>
            <span>• 당직</span>
          </div>
        )}

        {isAnnualLeaveCategory && (
          <div className='detail-rest'>
            <span>• 연차</span>
          </div>
        )}

        {event.category}
      </p>
      <button 
        className='detail-close'
        onClick={closeModal}>✖</button>
      </div>
    </Modal>
  );
};

export default EventModal;
