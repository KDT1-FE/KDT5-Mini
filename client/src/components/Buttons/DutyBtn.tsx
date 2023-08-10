import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import { RequestModal } from '../Modals/RequestModal';

const DutyBtn = () => {
  const { openModal } = useModal();

  const modalData = {
    isOpen: true,
    title: '당직 수정 신청',
    content: <RequestModal type={'duty'} />,
  };

  return <Container onClick={() => openModal(modalData)}>당직 수정</Container>;
};

export default DutyBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
