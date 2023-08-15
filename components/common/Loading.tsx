import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { theme } from "@styles/theme";

function Loading() {
  return (
    <LoadingBlock>
      <BounceLoader size={100} color={theme.bgColor} />
      <span>잠시만 기다려주세요</span>
    </LoadingBlock>
  );
}

const LoadingBlock = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.borderColor}; // 임시
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  span {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }
`;

export default Loading;
