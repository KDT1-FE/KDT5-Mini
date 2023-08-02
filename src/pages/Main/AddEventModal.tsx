import React, { useState } from 'react';
import Modal from 'react-modal';
import "./AddEventModal.scss";

interface AddEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleAddEvent: (newEvent: any) => void;
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
      <h1>일정 등록하기</h1>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={newEvent.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={newEvent.endDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={newEvent.category}
          onChange={handleInputChange}
        />
      </div>
      <div className="btn-group">
        <button onClick={handleSubmit}>등록</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </Modal>
  );
};

export default AddEventModal;
