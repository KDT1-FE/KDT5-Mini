import React from 'react';
import Modal from 'react-modal';
import "./EventModal.scss";

interface EventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  event: {
    extendedProps: any;
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
  
}
const EventModal: React.FC<EventModalProps> = ({ isOpen, closeModal, event }) => {
  const category = event._def.extendedProps.category;
  const startDate = new Date(event._instance.range.start);
  const endDate = new Date(event._instance.range.end);

  const isDutyCategory = category === "당직";
  const isAnnualLeaveCategory = category === "연차";

  console.log(event.extendedProps.reason);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} / ${month} / ${day}`;
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Modal"
      overlayClassName="custom-overlay"
      className="detail-custom-modal-content" 
    >
      <div className='detail-wrap'>      
        <h1 className='detail-header'>
          <img src='../../../public/assets/calendar.png'/>
          일정 상세
          </h1>
        <h2 className='detail-name'>{event.extendedProps.name}</h2>
        <div className='detail-title'>
          <span>제목:</span> {event.reason}
        </div>
        <div className='detail-date'>
          <span>기간:</span> {formattedStartDate} ~ {formattedEndDate}
        </div>
        <div className='detail-category'>
          <span>종류:</span>
          {isDutyCategory && (
            <div className='detail-duty'>
              <span><div>•</div>당직</span>
            </div>
          )}
          {isAnnualLeaveCategory && (
            <div className='detail-rest'>
              <span><div>•</div>연차</span>
            </div>
          )}
          <div className='detail-reason'>
            {event.extendedProps.reason}
          </div>
        </div>
        <button 
          className='detail-close'
          onClick={closeModal}>✖</button>
      </div>
    </Modal>
  );
};

export default EventModal;