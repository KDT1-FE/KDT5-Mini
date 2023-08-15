import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import EmployeeDutyModalForm from "@components/employee/EmployeeDutyModalForm";
import { styled } from "styled-components";
import Button from "@components/common/Button";

interface Iprops {
  toggle?: boolean;
  setListUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectModal({ toggle, setListUpdate }: Iprops) {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <EmployeeDutyModalForm toggle={toggle} setListUpdate={setListUpdate} />
      ),
    },
    {
      key: "2",
      label: (
        <EmployeeDutyModalForm toggle={!toggle} setListUpdate={setListUpdate} />
      ),
    },
  ];

  return (
    <>
      <StyledDropdown menu={{ items }} placement="top">
        <Button submit="true">등록하기</Button>
      </StyledDropdown>
    </>
  );
}

const StyledDropdown = styled(Dropdown)`
  padding: 2px auto;
`;

export default SelectModal;
