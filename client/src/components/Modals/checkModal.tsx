import { useModal } from '@/hooks/useModal';
import { cancelAnnual } from '@/lib/api';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const CheckModal = ({ type }: { type: string | number }) => {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const destination = `/${type}`;

  const handleOnClickYes = async () => {
    if (typeof type === 'number') {
      await cancelAnnual(type, { id: type });
      console.log(type);
      closeModal();
      location.reload();
    } else {
      closeModal();
      navigate(destination);
      location.reload();
    }
  };

  return (
    <Container>
      {typeof type === 'string' && <div>신청내역을 확인하시겠습니까?</div>}
      <BtnWrap>
        <AnswerBtn className="yseBtn" onClick={() => handleOnClickYes()}>
          네
        </AnswerBtn>
        <AnswerBtn className="noBtn" onClick={() => closeModal()}>
          아니오
        </AnswerBtn>
      </BtnWrap>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 32px;

  div {
    margin-bottom: 32px;
  }
`;
const BtnWrap = styled.div`
  justify-content: center;
  display: flex;
  gap: 32px;
`;
const AnswerBtn = styled.button`
  width: 70px;
  height: 34px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  &.yseBtn {
    color: ${props => props.theme.white};
    background: ${props => props.theme.primary};
  }
  &.noBtn {
    color: ${props => props.theme.gray};
    background: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.gray};
  }
`;

export default CheckModal;
