import { PropsWithChildren } from "react";
import styled from "styled-components";

function AdminAuthTemplate({ children }: PropsWithChildren) {
  return (
    <AuthTemplateBlock>
      <NavyBox>{children}</NavyBox>
    </AuthTemplateBlock>
  );
}

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://github.com/FAST-MINI-TEAM1/client-team1/assets/125563995/ff793dc1-4cfb-4c40-83f6-a5874d3465c9");
  background-size: 100%;
`;

const NavyBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  width: 480px;
  padding: 2rem;
  background: #192859;
  border-radius: 24px;
`;

export default AdminAuthTemplate;
