import { useState, useEffect, ChangeEvent } from "react";
import { Input, Modal, Select, Space, DatePicker } from "antd";
import Button from "@components/common/Button";
import { styled } from "styled-components";
import Image from "next/image";
import bottomDot from "public/bottomDot.png";
import { employeeOrderApi } from "@lib/api/employeeAPI";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

interface IEmployeeDutyModalprops {
  toggle?: boolean;
  setListUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function EmployeeDutyModalForm({
  toggle,
  setListUpdate,
}: IEmployeeDutyModalprops) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //modal에서 받는 inputVlaue값
  const [startAt, setStartAt] = useState<string>("");
  const [endAt, setEndAt] = useState<string>("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputReason, setInputReason] = useState("");
  const [inputEtc, setInputEtc] = useState("");

  // select 연차/당직일
  const { RangePicker } = DatePicker;

  const handleDateChange = (
    _: DatePickerProps["value"] | RangePickerProps["value"],
    dateStrings: string[],
  ) => {
    const selectedDates = dateStrings;
    const inputstartAt = selectedDates[0];
    const inputendAt = selectedDates[1];
    setStartAt(inputstartAt);
    setEndAt(inputendAt);
  };

  useEffect(() => {
    if (endAt) {
      setStartAt((startAt) => startAt);
      setEndAt((endAt) => endAt);
    }
  }, [startAt, endAt]);

  // select 연차종류
  const selectCategory = (value: string) => {
    setInputCategory(value);
  };
  const searchCategory = (value: string) => {
    console.log("search:", value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 당직 등록 API
  const dutyOrder = async () => {
    try {
      const res = await employeeOrderApi({
        orderType: "당직",
        startAt: startAt,
        endAt: endAt,
        reason: null,
        category: null,
        etc: inputEtc,
      });
      const Data = res?.data;
      if (!Data.success) {
        console.error("서버로 부터 응답, 에러 발생");
        return;
      }
    } catch (error) {
      console.error("서버로 부터 응답 없음", error);
    } finally {
      setListUpdate((prev: boolean) => !prev);
      setIsModalOpen(false);
      setStartAt("");
      setEndAt("");
      setInputCategory("");
      setInputReason("");
      setInputEtc("");
    }
  };

  // 연차 등록 API
  const annualOrder = async () => {
    try {
      const res = await employeeOrderApi({
        orderType: "연차",
        startAt: startAt,
        endAt: endAt,
        reason: inputReason,
        category: inputCategory,
        etc: inputEtc,
      });
      const Data = res?.data;
      if (!Data.success) {
        console.error("서버로 부터 응답, 에러 발생");
        return;
      }
    } catch (error) {
      console.error("서버로 부터 응답 없음", error);
    } finally {
      setListUpdate((prev: boolean) => !prev);
      setIsModalOpen(false);
      setStartAt("");
      setEndAt("");
      setInputCategory("");
      setInputReason("");
      setInputEtc("");
    }
  };

  return (
    <>
      {toggle ? (
        <Button annual="true" onClick={showModal}>
          연차 등록하기
        </Button>
      ) : (
        <Button duty="true" onClick={showModal}>
          당직 등록하기
        </Button>
      )}

      <StyledDutyModal
        title={toggle ? "연차 등록하기" : "당직 등록하기"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        width={520}
      >
        <StyledSpace direction="horizontal">
          <StyledLabel> {toggle ? "연차일" : "당직일"}</StyledLabel>
          <RangePicker bordered={false} onChange={handleDateChange} />
        </StyledSpace>
        {toggle ? (
          <StyledSpace direction="horizontal">
            <StyledLabel>휴가종류</StyledLabel>
            <Select
              bordered={false}
              showSearch
              placeholder="휴가종류"
              optionFilterProp="children"
              onChange={selectCategory}
              onSearch={searchCategory}
              value={inputCategory || null}
              filterOption={(input, option) =>
                (option?.label ?? "휴가종류").includes(input)
              }
              options={[
                {
                  value: "경조사",
                  label: "경조사",
                },
                {
                  value: "병가",
                  label: "병가",
                },
                {
                  value: "출산휴가",
                  label: "출산휴가",
                },
                {
                  value: "생리휴가",
                  label: "생리휴가",
                },
              ]}
            />
          </StyledSpace>
        ) : null}
        <StyledSpace direction="horizontal">
          <StyledLabel>사유</StyledLabel>
          <StyledInput
            bordered={false}
            type="text"
            placeholder="입력하세요"
            value={inputReason}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputReason(e.target.value);
            }}
          ></StyledInput>
        </StyledSpace>
        <StyledSpace direction="horizontal">
          <StyledLabel>특이사항</StyledLabel>
          <StyledInput
            bordered={false}
            type="text"
            placeholder="입력하세요"
            value={inputEtc}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputEtc(e.target.value);
            }}
          ></StyledInput>
        </StyledSpace>
        <BtnContainer>
          <Button
            cancle="ture"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            취소
          </Button>
          {toggle ? (
            <Button application="ture" onClick={annualOrder}>
              신청
            </Button>
          ) : (
            <Button application="ture" onClick={dutyOrder}>
              신청
            </Button>
          )}
        </BtnContainer>
        <Image src={bottomDot} alt="backpng" />
      </StyledDutyModal>
    </>
  );
}

const StyledDutyModal = styled(Modal)`
  display: flex;
  text-align: center;
  font-size: 18px;
  .annualNum {
    font-size: 15px;
    color: red;
    text-align: right;
  }
  .ant-modal-title {
    margin-top: 50px;
    font-size: 18px;
  }
  .ant-modal-body {
    font-size: 16px;
    padding: 30px;
    margin: 20px;
    // background-color: red;
  }
`;

const StyledInput = styled(Input)`
  font-size: 15px;
`;
const StyledSpace = styled(Space)`
  font-size: 15px;
  width: 100%;
  margin: 10px 0;
  border-bottom: 0.5px solid #e0e0e0;
  // justify-content: space-between;
`;
const StyledLabel = styled.div`
  width: 60px;
  text-align: left;
  font-weight: bold;
  margin: 0 20px;
`;
const BtnContainer = styled.div`
  margin: 60px auto;
  width: 260px;
  display: flex;
  justify-content: space-between;
`;

export default EmployeeDutyModalForm;
