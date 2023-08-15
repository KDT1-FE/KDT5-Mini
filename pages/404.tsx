import Link from "next/link";
import styled from "styled-components";
import { Result } from "antd";

function ErrorPage() {
  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="페이지를 찾을 수 없습니다."
        extra={<Link href={"/"}>로그인 페이지로 이동!</Link>}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

export default ErrorPage;
