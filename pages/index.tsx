import Button from "@components/common/Button";
import Link from "next/link";
import styled from "styled-components";

function Home() {
  return (
    <>
      <HomeBlock>
        <HomeContent>
          <ButtonWrapper>
            <Link href="/login">
              <EmployeeButton employee>사원 로그인</EmployeeButton>
            </Link>
            <Link href="/admin/login">
              <AdminButton admin>관리자 로그인</AdminButton>
            </Link>
          </ButtonWrapper>
        </HomeContent>
      </HomeBlock>
    </>
  );
}

const HomeBlock = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeContent = styled.div`
  width: 1320px;
  height: 100vh;
  max-width: 1320px;
  /* background: coral; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const EmployeeButton = styled(Button)`
  width: 240px;
  height: 60px;
`;

const AdminButton = styled(Button)`
  width: 240px;
  height: 60px;
`;

export default Home;
