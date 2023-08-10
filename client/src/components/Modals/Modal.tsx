import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import { GrClose } from 'react-icons/gr';

export const Modal = () => {
  const { modalDataState, closeModal } = useModal();

  return (
    <>
      {modalDataState.isOpen && (
        <ModalContainer>
          <ModalBody>
            <ModalCloseButton onClick={closeModal}>
              <GrClose />
            </ModalCloseButton>
            <ModalContent>
              <ModalTitle>{modalDataState.title}</ModalTitle>
              {modalDataState.content}
            </ModalContent>
          </ModalBody>
        </ModalContainer>
      )}
    </>
  );
};

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalBody = styled.div`
  box-sizing: border-box;
  width: 550px;
  color: ${props => props.theme.black};
  background-color: ${props => props.theme.white};
  border-radius: 8px;
  padding: 46px 46px 56px 46px;
`;
export const ModalContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px 0 20px 0;
`;

export const ModalTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 8px;
`;
export const ModalCloseButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  text-align: right;
`;
