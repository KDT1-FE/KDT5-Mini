import { hospitalDecode } from '@/utils/decode';
import { MdOutlineLocalHospital } from 'react-icons/md';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserDataState } from '@/states/stateUserdata';

const MainHeader = () => {
  const UserData = useRecoilValue(UserDataState);
  const hospitalNum = UserData.hospitalId;

  return (
    <Container>
      <HosPitalName>
        <MdOutlineLocalHospital />
        {hospitalNum && <span className="hospital-name">{hospitalDecode[hospitalNum].hospital}</span>}
      </HosPitalName>
    </Container>
  );
};

export default MainHeader;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 70px;
  color: ${props => props.theme.gray};
  font-weight: 500;
`;

const HosPitalName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
