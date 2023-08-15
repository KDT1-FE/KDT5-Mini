import Button from "@components/common/Button";
import Link from "next/link";
import { styled } from "styled-components";
import Image from "next/image";
import Back1 from "public/back1.png";
import Back2 from "public/back2.png";

function Home() {
  return (
    <>
      <HomeBlock>
        <HomeContent>
          <Logo>
            <div className="deco">
              <Image src={Back1} alt="반짝이" />
            </div>
            <span>Work fairy</span>
            <div className="deco2">
              <Image src={Back2} alt="반짝이" />
            </div>
          </Logo>
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
  background-image: url("https://github.com/FAST-MINI-TEAM1/client-team1/assets/125563995/ff793dc1-4cfb-4c40-83f6-a5874d3465c9");
  background-size: 100%;
`;

const HomeContent = styled.div`
  width: 1320px;
  height: 100vh;
  min-width: 1320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  font-family: "Satisfy", cursive;
  font-size: 130px;
  color: #4f4a45;
  text-shadow: 0px 3px 7px rgba(81, 81, 81, 0.25);
  margin-bottom: 100px;
  max-width: 1320px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .deco {
    position: absolute;
    top: -126px;
    left: -156px;
  }
  .deco2 {
    position: absolute;
    bottom: -146px;
    right: -96px;
  }
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
