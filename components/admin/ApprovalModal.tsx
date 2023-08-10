import { Modal } from "antd";
import Button from "@components/common/Button";
import styled from "styled-components";
import { postUpdateOrder } from "@lib/api/adminAPI";
import { IModalProps } from "@lib/interface/Admin";

function ApprovalModal({ open, setOpen, details }: IModalProps) {
  const handleClick = async (e: MouseEvent, id: number, status: string) => {
    e.preventDefault();
    try {
      const res = await postUpdateOrder({ id, status });
      console.log("결재처리 성공", res);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log("결재 처리 실패", error);
    }
  };

  return (
    <StyledModal open={open} onCancel={() => setOpen(false)} footer={[]}>
      {details && (
        <>
          <div className="details">
            <h3>{details?.orderType} 결재 내역</h3>
            <ul>
              <li>
                <span>이름</span>
                <p>{details?.empName}</p>
              </li>
              <li>
                <span>결재 요청일</span>
                <p> {details?.createdAt}</p>
              </li>
              <li>
                <span>신청일</span>
                <p>
                  {details.startDate} ~ {details.endDate}
                </p>
              </li>
              {details.orderType === "연차" && (
                <>
                  <li>
                    <span>휴가종류</span>
                    <p>{details.category}</p>
                  </li>
                  <li>
                    <span>사유</span>
                    <p>{details.reason}</p>
                  </li>
                </>
              )}
            </ul>
          </div>
          {details.status == "대기" && (
            <div className="btnBox">
              <Button
                deny="true"
                onClick={(e: MouseEvent) => handleClick(e, details.id, "반려")}
              >
                반려
              </Button>
              <Button
                accept="true"
                onClick={(e: MouseEvent) => handleClick(e, details.id, "승인")}
              >
                승인
              </Button>
            </div>
          )}
        </>
      )}
    </StyledModal>
  );
}

export default ApprovalModal;

const StyledModal = styled(Modal)`
  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    h3 {
      font-size: 16px;
      font-weight: 700;
    }
    ul {
      margin-top: 50px;

      li {
        display: flex;
        margin-bottom: 20px;
        border-bottom: 1px solid #e6e6e6;
        span {
          width: 100px;
        }
      }
    }
  }
  .btnBox {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
  }
`;
