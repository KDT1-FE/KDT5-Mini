import styled from 'styled-components';

interface ModalBtnProps {
  handler: () => void;
}

const ModalBtn: React.FC<ModalBtnProps> = ({ handler }) => {
  return <Container onClick={handler}>신청하기</Container>;
};

export default ModalBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 60px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
