import Modal from "../../Components/Modal/Modal.tsx";
import { useState } from "react";
import MyDateRangePicker from "../../Components/Calendar-input/Calendar.tsx";

export default function Main() {
  const [visibility, setVisibility] = useState(false);
  return (
    <>
      <h1>Main</h1>
      <button onClick={() => setVisibility(true)}>Open Modal</button>

      {/*모달 사용시 모달로 묶어 주시면 됩니다. state로 toggle 됩니다.*/}
      <Modal visibility={visibility} toggle={setVisibility}>
        <MyDateRangePicker />
      </Modal>
    </>
  )
}
