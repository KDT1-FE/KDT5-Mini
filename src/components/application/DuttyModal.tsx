import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';
import { applyDuty } from 'api/index';

export const DuttyModal = ({
  close, 
  selectedDate, 
  setSelectedDate, 
  searchData, 
  data, 
  username}) => {

  const SubmitText = {
    ApplyDutty:'당직 신청',
    SelectDate:'날짜 선택',
  }

  const [dutyDate, ] = useState(selectedDate || new Date());
  const [ViewData, ] = useState({
    startDate: '',
    endDate: '',
    reason:''
  })


  const submitButton = () => {  
    const isDuplicateDate = data.filter((item) => {
      const itemDay = item.date;
      itemDay.setHours(9,0,0,0);
      selectedDate.setHours(9, 0, 0, 0);
      if (
        selectedDate.getTime() === itemDay.getTime()
        && item.username === username
      ) {
        return item;
      }
   });
    if (isDuplicateDate.length > 0) {
      alert("이미 해당 날짜에 신청한 연차가 존재합니다.");
      return false;
    }
    const updatedData = {
      ...ViewData,
      dutyDate: UTCchangeKST(dutyDate)
    }

    if (confirm('당직 신청 하시겠습니까?')) {
      sendReg(updatedData)
    }
  
    return
  }

  const UTCchangeKST = (date) => {
    let krDate = new Date(date);
    krDate.setHours(krDate.getHours() + 9);
    return krDate.toISOString();
  };

  const sendReg = async (updatedData: any) => {
    try {
      const response = await applyDuty(updatedData)
      if (response.status === 200) {
        alert('당직이 신청 되었습니다.')
        searchData();
        close();
      } else {
        alert('신청 실패했습니다. 관리자에게 문의하세요.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return(
    <>
    <ModalContent>
      <Centerbox>
      <XbuttonBox onClick={close}>x</XbuttonBox>
        <ModalHeader>
          <p>{SubmitText.ApplyDutty}</p>
        </ModalHeader>
        <PickDate>{SubmitText.SelectDate}</PickDate>
        <DateContainer>
          <DatePicker
            selected={selectedDate}
            minDate={new Date()} 
            onChange={(date) => setSelectedDate(date)}
            selectsStart
            startDate={dutyDate}
            dateFormat="yyyy/MM/dd"
            filterDate={isWeekday}
          />
        </DateContainer>
        <Register onClick={submitButton}>등록</Register>
      </Centerbox>
    </ModalContent>
    </>
  )
}

const ModalContent = styled.div`
  width: 400px;
  background-color: #ffff;
  position: absolute;
  top: 300px;
  z-index:100;
  left: 0px;
  right: 200px;
  margin: auto;
  border: 2px solid #696ea6;
  border-radius: 10px;
  font-family: 'LINESeedKR-Bd';
`

const Centerbox = styled.div`
  width: 90%;
  margin: auto;
  position: relative;
  padding-bottom: 110px;
`

const ModalHeader = styled.p`
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;

  p {
    width: 30%;
    margin: auto;
  }
`
const PickDate = styled.div`
    width: 20%;
    position: relative;
    top: 20px;
    margin: auto;
`

const DateContainer = styled.div`
  width: 100px;
  height: 60px;
  top: 50px;
  margin: auto;
  position: relative;

  .react-datepicker__input-container{
 
    input{
      width: 100px;
      height: 40px;
      padding: 10px;
      font-family: 'LINESeedKR-Bd';
      background-color: #a8a3e29a;
      border-radius: 5px;
      border: none;
      cursor: pointer;
    }
  }

.react-datepicker__tab-loop{
  position: absolute;
}
`
const XbuttonBox = styled.button`
  width: 20px;
  position: absolute;
  top: -10px;
  right: 10px;
  z-index: 100;
  border: 2px solid #696ea6;
  background-color: #ffff;
` 

const Register = styled.button`
  width: 200px;
  padding: 10px;
  position: relative;
  top: 70px;
  left: 80px;
  background-color: #a8a3e29a;
  border: none ;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`