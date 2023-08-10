import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';
import { applyAnnual } from 'api/index';
import { CategoryBox } from 'constants/index';

export const AnnualModal = ({
  close, 
  selectedDate, 
  setSelectedDate, 
  searchData, 
  data, 
  username
  }) => {

  const SubmitText = {
    ApplyAnnual:'연차 신청',
    SelectDate:'날짜 선택',
    SelectReason:'사유선택'
  }

  const [startDate] = useState(selectedDate || new Date());
  const [endDate, setEndDate] = useState(selectedDate || new Date());
  const [getReason, setReason] = useState("연차")
  const [ViewData] = useState({
    startDate: '',
    endDate: '',
    reason:''
  })


  const handleChange = (e) => {
    console.log(e.target.value)
    setReason(e.target.value);
  }

  const submitButton = () => {
    selectedDate.setHours(9, 0, 0, 0);
    const isDuplicateDate = data.filter((item) => {
      console.log(item)
      const startDay = item.start;
      const endDay = item.end;
      startDay.setHours(9,0,0,0)
      endDay.setHours(9,0,0,0)
      endDate.setHours(9,0,0,0)

      if (
        endDate >= startDay && endDate <= endDay
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
      startDate: UTCchangeKST(startDate),
      endDate: UTCchangeKST(endDate), 
      reason: getReason
    }

    if (confirm('연차 신청 하시겠습니까?')) {
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
      const response = await applyAnnual(updatedData)
      if (response.status === 200) {
        alert('연차가 신청 되었습니다.')
        searchData();
        close();
      } else {
        alert('등록 실패했습니다. 관리자에게 문의하세요.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const renderBox = () => CategoryBox.map((item) => {
    return(
        <option key={item.id}>{item.name}</option>      
    )
  })

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
          <p>{SubmitText.ApplyAnnual}</p>
        </ModalHeader>
        <PickDate>{SubmitText.SelectDate}</PickDate>
        <DateContainer>
          <DatePicker
            selected={selectedDate} 
            minDate={new Date()}
            onChange={(date) => setSelectedDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            filterDate={isWeekday}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            dateFormat="yyyy/MM/dd"
            filterDate={isWeekday}
          />
        </DateContainer>
        <PickReason>{SubmitText.SelectReason}</PickReason>
        <SelectContainer>
          <Selectbox onChange={(e) => handleChange(e)}>
            {renderBox()}
          </Selectbox>
        </SelectContainer>
        <Register onClick={submitButton}>등록</Register>
      </Centerbox>
    </ModalContent>
    </>
  )
}

const ModalContent = styled.div`
  width: 400px;
  background-color: #ffff;
  position: relative;
  top: 200px;
  z-index:100;
  left: 90px;
  right: 0px;
  margin: auto;
  border: 2px solid #696ea6;
  border-radius: 10px;
  font-family: 'LINESeedKR-Bd';
`

const Centerbox = styled.div`
  width: 90%;
  margin: auto;
  position: relative;
  padding-bottom: 80px;
`

const ModalHeader = styled.p`
  width: 100%;
  display: flex;
  margin: auto;
  font-size: 25px;
  font-weight: bold;
  position: relative;
  margin-top: 20px;

  p {
    width: 30%;
    position: relative;
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
  width: 230px;
  height: 50px;
  margin-top: 30px;
  display: flex;
  gap: 30px;
  left: 0px;
  right: 10px;
  top: 40px;
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
const PickReason = styled.div`
  width: 20%;
  padding-bottom: 10px;
  top: 50px;
  margin: auto;
  position: relative;
`
const SelectContainer = styled.div`
  width: 30%;
  position: relative;
  margin-top: 60px;
  margin-left: 120px;
`
const Selectbox = styled.select`
  width: 100%;
  background-color: #fefefe;
  padding: 10px;
  border: 2px solid #999fe3;
  border-radius: 10px;
  font-family: 'LINESeedKR-Bd';
`

const Register = styled.button`
  width: 200px;
  padding: 10px;
  position: relative;
  top: 30px;
  margin-left: 80px;
  padding-bottom: 10px;
  background-color: #a8a3e29a;
  border: none ;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`