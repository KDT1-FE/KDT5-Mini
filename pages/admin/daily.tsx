import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { getDailyDuty, getDailyAnnual } from "@lib/api/adminAPI";
import { styled } from "styled-components";
import AdminHeader from "@components/common/AdminHeader";
import { IDailyResponse } from "@lib/interface/Admin";

function Daily() {
  const [tabKey, setTabKey] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [dutyData, setDutyData] = useState<IDailyResponse[]>([]);
  const [annualData, setAnnualData] = useState<IDailyResponse[]>([]);

  useEffect(() => {
    const getDailyData = async () => {
      if (tabKey === "당직") {
        try {
          const { data } = await getDailyDuty(year, month);
          setDutyData(data.response);
        } catch (error) {
          alert("당직 조회 오류 발생하였습니다!");
        }
      } else {
        try {
          const { data } = await getDailyAnnual(year, month);
          setAnnualData(data.response);
        } catch (error) {
          alert("연차 조회 오류 발생하였습니다!");
        }
      }
    };
    getDailyData();
  }, [tabKey, year, month]);

  const handleChange = (activeStartDate: Date | null) => {
    if (activeStartDate) {
      const activeYear = new Date(activeStartDate).getFullYear();
      const activeMonth = new Date(activeStartDate).getMonth() + 1;
      setYear(activeYear);
      setMonth(activeMonth);
    }
  };

  function dutyTileContent({ date }: any) {
    if (
      dutyData?.find((item) => item.date === moment(date).format("YYYY-MM-DD"))
    ) {
      const filteredDate = moment(date).format("YYYY-MM-DD");
      const employeeData = dutyData?.filter((item) => {
        return item.date === filteredDate;
      });
      return (
        <>
          {employeeData?.map((item) => (
            <>
              <DutyPerson key={item.empNo}>
                {item.empName} / {item.empNo}
              </DutyPerson>
            </>
          ))}
        </>
      );
    }
  }

  function annualTileContent({ date }: any) {
    if (
      annualData?.find(
        (item) => item.date === moment(date).format("YYYY-MM-DD"),
      )
    ) {
      const filteredDate = moment(date).format("YYYY-MM-DD");
      const employeeData = annualData?.filter((item) => {
        return item.date === filteredDate;
      });
      return (
        <>
          {employeeData?.map((item) => (
            <>
              <AnnualPerson key={item.empNo}>
                {item.empName} / {item.empNo}
              </AnnualPerson>
            </>
          ))}
        </>
      );
    }
  }

  const handleClick = (key: string) => {
    setTabKey(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "연차",
      label: `연차`,
    },
    {
      key: "당직",
      label: `당직`,
    },
  ];

  return (
    <>
      <AdminHeader />
      <DateSection>
        <StyledTabs
          defaultActiveKey="1"
          items={items}
          tabBarGutter={30}
          onTabClick={(key: any) => handleClick(key)}
        />
        <Container>
          <StyeldCalendar
            calendarType="gregory"
            formatDay={(_: any, date: any) => moment(date).format("D")}
            tileContent={
              tabKey === "당직" ? dutyTileContent : annualTileContent
            }
            onActiveStartDateChange={({ activeStartDate }: any) =>
              handleChange(activeStartDate)
            }
          />
        </Container>
      </DateSection>
    </>
  );
}
const DateSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;
const StyledTabs = styled(Tabs)`
  &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: coral;
  }
  &.ant-tabs .ant-tabs-ink-bar {
    background: coral;
  }
`;
const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1050px;
  height: 900px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
`;

const DutyPerson = styled.div`
  background: #ff5b48;
  padding: 5px 0;
  border-radius: 10px;
  color: #fff;
  margin-bottom: 5px;
`;

const AnnualPerson = styled.div`
  background: #2c88de;
  padding: 5px 0;
  border-radius: 10px;
  color: #fff;
  margin-bottom: 2px;
`;
const StyeldCalendar = styled(Calendar)`
  &.react-calendar {
    width: 1000px;
    border: none;
    color: #191919;
  }
  // Today
  .react-calendar__tile--now {
    background-color: transparent;

    abbr {
      border-bottom: 1.8px solid #1ebf91;
      width: 30px;
      padding-bottom: 5px;
    }
  }

  // 2. 달력 년/월 표시 글씨 커스텀

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
  }

  .react-calendar__navigation__label > span {
    font-size: 30px;
  }
  // 날짜 화살표 아이콘
  .react-calendar__navigation__arrow react-calendar__navigation__next-button {
  }

  //요일 section 커스텀 하기
  .react-calendar__month-view__weekdays {
    abbr {
      color: #adb5bd;
      font-size: 14px;
      font-weight: 400;
    }
  }
  // day 타일 한개 한개 모양 커스텀하기
  .react-calendar__tile {
    position: relative;
    height: 130px;
    border-top: 1px solid #e4e4e4;
    abbr {
      position: absolute;
      top: 15px;
      right: 10px;
      font-size: 18px;
    }
  }
  // day 타일 hover, focus 시 모양 커스텀
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #f0f0f0;
  }
  // 날짜 선택 됐을 때 day 타일 커스텀하기
  .react-calendar__tile--active {
    background-color: #f0f0f0;
  }
  //(range일 경우)시작날짜, 끝 날짜 커스텀하기
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
  }

  //. range 선택 중 hover 때 중간 날짜 커스텀하기
  .react-calendar--selectRange .react-calendar__tile--hover {
  }
`;

export default Daily;
