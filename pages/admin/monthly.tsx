import { Tabs } from "antd";
import type { TabsProps } from "antd";
import MonthlyTable from "@components/admin/MonthlyTable";
import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { getMonthlyAnnual, getMonthlyDuty } from "@lib/api/adminAPI";
import { IColumnsData } from "@lib/interface/Admin";
import AdminHeader from "@components/common/AdminHeader";

function Monthly() {
  const [dutyData, setDutyData] = useState<IColumnsData[]>([]);
  const [annualData, setAnnualData] = useState<IColumnsData[]>([]);
  const [tabKey, setTabKey] = useState("");

  const getMonthlyData = useCallback(async () => {
    const year = new Date().getFullYear();
    try {
      const { data } = await getMonthlyAnnual(year);
      setAnnualData(data.response);
      const { data: duty } = await getMonthlyDuty(year);
      setDutyData(duty.response);
    } catch (error) {
      console.log("월별 조회 실패, error");
    }
  }, []);

  useEffect(() => {
    getMonthlyData();
  }, [getMonthlyData]);

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
      <MonthlySection>
        <h2>월별 사용 대장</h2>
        <Container>
          <StyledTabs
            defaultActiveKey="1"
            items={items}
            tabBarGutter={30}
            onTabClick={(key: any) => handleClick(key)}
          />
          <Inner>
            <MonthlyTable
              dataSource={tabKey === "당직" ? dutyData : annualData}
            />
          </Inner>
        </Container>
      </MonthlySection>
    </>
  );
}

export default Monthly;
const MonthlySection = styled.section`
  position: relative;
  h2 {
    position: absolute;
    top: 30px;
    left: 90px;
    font-size: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 0;
`;

const StyledTabs = styled(Tabs)`
  &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: coral;
  }
  &.ant-tabs .ant-tabs-ink-bar {
    background: coral;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px 30px;
  box-sizing: border-box;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
`;
