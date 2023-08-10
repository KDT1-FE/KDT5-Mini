import { useEffect, useState } from "react";
import { Modal, Space } from "antd";
import { styled } from "styled-components";
import Button from "@components/common/Button";
import { IDataSourceItem } from "@lib/interface/Admin";
import { employeeDeleteApi } from "@lib/api/employeeAPI";
import Image from "next/image";
import bottomDot from "public/bottomDot.png";

interface Iprops {
  employeeOpen: boolean;
  setEmployeeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  details?: IDataSourceItem;
  setListUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}
function EmployeeHistoyModal({
  employeeOpen,
  setEmployeeOpen,
  details,
  setListUpdate,
}: Iprops) {
  const [contnetdetails, setcontnetdetails] = useState<IDataSourceItem>();

  const handleOk = () => {
    employeeOpen;
  };

  const handleCancel = () => {
    setEmployeeOpen(false);
  };

  const deletHandeler = async () => {
    if (contnetdetails) {
      await employeeDeleteApi(contnetdetails.id);
      setEmployeeOpen(false);
      setListUpdate((prev: boolean) => !prev);
    }
  };

  useEffect(() => {
    if (details) {
      setcontnetdetails(details);
    }
  }, [details]);

  return (
    <>
      <StyledModal
        title={`${details?.orderType} 결재 관리`}
        open={employeeOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={420}
      >
        <Container>
          <StyledSpace direction="horizontal" size="middle">
            <StyledLabel>사원명</StyledLabel>
            <li>{contnetdetails?.empName}</li>
          </StyledSpace>
          <StyledSpace direction="horizontal" size="middle">
            <StyledLabel>신청일</StyledLabel>
            <li>{contnetdetails?.createdAt}</li>
          </StyledSpace>
          <StyledSpace direction="horizontal" size="middle">
            <StyledLabel>연차일자</StyledLabel>
            <li>
              {contnetdetails?.startDate}~{contnetdetails?.endDate}
            </li>
          </StyledSpace>
          {contnetdetails?.orderType == "연차" ? (
            <StyledSpace direction="horizontal" size="middle">
              <StyledLabel>휴가종류</StyledLabel>
              <li>{contnetdetails.category}</li>
            </StyledSpace>
          ) : null}
          <StyledSpace direction="horizontal" size="middle">
            <StyledLabel>사유</StyledLabel>
            <li>{contnetdetails?.reason}</li>
          </StyledSpace>
          <StyledSpace direction="horizontal" size="middle">
            <StyledLabel>특이사항</StyledLabel>
            <li>{contnetdetails?.etc}</li>
          </StyledSpace>
          <StyledSpace direction="horizontal" size="middle">
            <StyledLabel>승인상태</StyledLabel>
            <li>{contnetdetails?.status}</li>
          </StyledSpace>
        </Container>
        <StyledBtn delete="true" onClick={deletHandeler}>
          삭제하기
        </StyledBtn>
        <Image src={bottomDot} alt="backpng" />
      </StyledModal>
    </>
  );
}
const StyledModal = styled(Modal)`
  height: 680px;
  text-align: center;
  padding: auto;
  .ant-modal-title {
    margin-top: 20px;
    font-size: 18px;
  }
  .ant-modal-body {
    font-size: 16px;
    padding-bottom: 20px;

    // background-color: red;
  }
`;
const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  padding: auto;
  ul {
    text-align: left;
    margin: 50px 15px;
  }
`;
const StyledSpace = styled(Space)`
  font-size: 15px;
  width: 100%;
  margin: 10px 0;
  border-bottom: 0.5px solid #e0e0e0;
  padding-bottom: 10px;
  text-shadow: 0px 3px 7px 0px rgba(81, 81, 81, 0.25);
  li {
    text-shadow: 0px 3px 7px rgba(81, 81, 81, 0.25);
    font-family: Noto Sans KR;
    font-size: 15px;
    font-weight: 400;
  }
`;
const StyledLabel = styled.div`
  width: 60px;
  text-align: left;
  font-weight: bold;
  margin: 0 20px;
`;
const StyledBtn = styled(Button)`
  width: 90%;
  margin: 10px auto 30px auto;
`;
export default EmployeeHistoyModal;
