import styled from 'styled-components'
import { useNavigate, } from 'react-router-dom'; 
import { AllDataList } from './index';
import { DeleteAnnualList, DeleteDutyList } from 'api/index';
import { useEffect, useState } from 'react';
import { MyAnnualList, MyDutyList, ExcelAnnualList, ExcelDutyList,UserInfoList } from 'api/index';
import { ExcelCategory } from 'constants/index';
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { IoReload } from 'react-icons/io5'

interface Item {
  id:string;
  startDate: string;
  endDate: string;
  status:string;
}

export const Home =  () => {

  const [CalDate, setCalDate] = useState<number>(2023);
  const [annualDataList, setAnnualDataList] = useState([]);
  const [dutyDataList, setDutyDataList] = useState([]);
  
  const [user, SetUser] = useState({
    remainVacation: ""
  });
  const [selectedOption, setSelectedOption] = useState('엑셀로 다운받기');

  const navigate = useNavigate();

  useEffect(() => {
    searchInfo();
  },[]);

  const searchInfo = () => {
    UserInfoList()
    .then((data) => {
      const uerData = data.data.response;
      SetUser(uerData);
    })
  }


  const onChangeClick = () => {
    navigate('/application')
  }

  const searchData = () => {

    MyAnnualList(CalDate.toString())
    .then((data) => {
      const returnDatalist = data.data.response;
      console.log(returnDatalist)
      setAnnualDataList(returnDatalist);
      return MyDutyList(CalDate.toString()); 
    })
    .then((data) => {
      const returnDatalist = data.data.response;
      setDutyDataList(returnDatalist);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  useEffect(() => {
    searchData();
  }, [CalDate]);

  const extractDate = (dateString) => {
    const date = dateString.split('T')[0];
    return date;
  };

  const deleteButton = (type: string , id: string) => {
      if(!window.confirm(`${type}를 취소 하시겠습니까?`)) {
        alert(`취소되었습니다.`);
        return false;
      }

      try{
        if(type == "연차"){
          DeleteAnnualList(id)
          .then((data) =>{
            console.log(data.status);
            if(data.status == 200){
              alert(`${type}가 취소되었습니다.`);
              searchData();
            }else{
              alert(`취소가 실패했습니다.`);
            }
          })
        }else{
          DeleteDutyList(id)
          .then((data) =>{
            console.log(data.status);
            if(data.status == 200){
              alert(`${type}가 취소되었습니다.`);
              searchData();
            }else{
              alert(`취소가 실패했습니다.`);
            }
          })
        }
      }catch(e){
        console.log(e);
        alert(`${e} 문의주세요.`);
      }
      return
  }

  const datalist = (datalist) => {
    const filterViewData = datalist.filter((item)=>{
      if(item.status !== "CANCELLED"){
        return item;
      }
    })
    return filterViewData;
  }
  
  const handleExcel = async () => {
    try {
      if (selectedOption === '연차') {
        const res = await ExcelAnnualList('2023');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `연차.xlsx`;
        link.click();
      } else if (selectedOption === '당직') {
        const res = await ExcelDutyList('2023');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `당직.xlsx`;
        link.click();
      }
    } catch (error) {
      console.error('Error fetching or generating Excel data:', error);
    }
  };

  const renderBox = () => (
    <>
      <option  value="excel" selected>
        엑셀로 다운받기
      </option>
      {ExcelCategory.map((item) => (
        <option key={item.id} >
          {item.name}
        </option>
      ))}
    </>
  );

  const onClickLoad = () => {
    window.location.reload();
  };

  return(
    <HomeContainer>
      <Boards>
      <AnnualBoard>
        <BoxText>
          <span>연차 신청</span>
          <span>남은연차: {user.remainVacation}개 </span>
        </BoxText>
        <AuualListBox>
        {datalist(annualDataList).map((item:Item) => (
          <AuualList key={item.id}>
            <h2>📌 {extractDate(item.startDate)} ~ {extractDate(item.endDate)}</h2>
            <StatusBox>{item.status}</StatusBox>
            <CancelBox onClick={() => deleteButton('연차', item.id)}>취소</CancelBox>
          </AuualList>
        ))}
        </AuualListBox>
     
      </AnnualBoard>
      <DutyBoard>
        <BoxText>당직 신청</BoxText>
        <DutyListBox>
        {datalist(dutyDataList).map((el) => (
            <DutyList key={el.id}>
              <h2>📌 {extractDate(el.dutyDate)}</h2>
              <StatusBox>{el.status}</StatusBox>
              <CancelBox onClick={() => deleteButton('당직', el.id)}>취소</CancelBox>
            </DutyList>
          ))}
        </DutyListBox>
   
      </DutyBoard>
      </Boards>
      <CenterBarBox>
        <ApplyBox>
          <HomeApply onClick={onChangeClick}>연차/당직 신청</HomeApply>
          <IoReload 
            onClick={onClickLoad}
            style={{
              fontSize: '28px',
              color: '#1c3879d9',
              cursor: 'pointer',
              marginLeft:'16px',
              marginTop:'5px',
              position:'absolute',
            }}/>
        </ApplyBox>
        <CenterBoxInner>
          <ExcelBox>
            <Optionbox value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            {renderBox()}
            </Optionbox>
            <AiOutlineCheckCircle onClick={handleExcel}
              style={{
                fontSize: '24px',
                color: '#ffff',
                cursor: 'pointer',
                marginLeft:'16px',
                marginTop:'10px'
              }}
            />
          </ExcelBox>
          <BarBox>
            <ScheduleBarone><p>연차</p></ScheduleBarone>
            <ScheduleBartwo><p>당직</p></ScheduleBartwo>
          </BarBox>
        </CenterBoxInner>
      </CenterBarBox>
      <CalendarBoard>
        <AllDataList 
          CalendarDate={setCalDate}
          annualData={annualDataList}
          dutyData={dutyDataList}
        />
      </CalendarBoard>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  width: 100%;
  height: 1100px;
  top: 20px;
  position: relative;
  margin: auto;
  font-family: 'LINESeedKR-Bd';
`
const Boards = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 50px;
  justify-content: space-between;
`
const Board = styled.div`
  width: 518px;
  height: 266px;
  border-radius: 10px;
  background-color: #fff;
  padding-bottom: 50px;
  border: 2px solid #696ea6;
  box-shadow: #50515985 1px 2px 7px 1px;
`

const BoxText = styled.div`
  width: 450px;
  padding-bottom: 10px;
  position: relative;
  left: 30px;
  top: 20px;
  color: ${props => props.theme.colors.listTitle};
  font-size: 15px;
  font-weight: 700;
  display: flex;
  gap: 250px;
`

const AnnualBoard = styled(Board)``
const DutyBoard = styled(Board)``

const CenterBarBox = styled.div`
  position: relative;
  top: 30px;
  display: flex;
  justify-content: space-between;
`
const ApplyBox = styled.div`
  width: 250px;
  position: relative;
  margin-top: 13px;
`
const HomeApply = styled.button`
  width: 150px;
  background-color: #1c3879d9;
  color:#fff;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  height: 40px;
  font-weight: bold;
  cursor: pointer;
`

const CenterBoxInner = styled.div`
  width: 380px;
  height: 50px;
  position: relative;
`

const ExcelBox = styled.div`
  width: 180px;
  padding-bottom: 5px;
  float: left;
  border-radius: 3px;
  margin-top: 10px;
  padding-left: 10px;
  background-color: #1B9C85;
  font-size: 10px;
  cursor: pointer;
`
const Optionbox = styled.select`
  background-color: #1B9C85;
  border: none;
  color: #ffff;
  font-weight: bold;
  position: relative;
  bottom: 6px;
    &:focus{
      outline: none;
    }
`
const BarBox = styled.div`
  width: 140px;
  margin-left: 200px;
  margin-top: 12px;
`
const ScheduleBarone = styled.div`
  width: 100px;
  height: 15px;
  border-radius: 30px;
  background-color: #4a42e4d4;
  position: relative;

  p {
    width: 30px;
    margin-left: 110px;
  }
`
const ScheduleBartwo = styled(ScheduleBarone)`
  background-color: #8696FE;
  margin-top: 10px;
`

const CalendarBoard = styled.div`
  width: 1200px;
  position: relative;
  top: 40px;
  right: 70px;
  border-radius: 10px;
  padding-bottom: 900px;
`

const AuualListBox = styled.div`
  width: 453px;
  height:200px;
  position: relative;
  top: 30px;
  margin: auto;
  overflow-y: auto;
  max-height: 200px;
`

const AuualList = styled.div`
  width: 100%;
  height: 30px;
  margin: auto;
  display: flex;
  margin-top: 20px;

  h2 {
    width: 250px;
    padding: 7px;
    padding-bottom: 2%;
  }
`
const StatusBox = styled.div`
  width: 80px;
  border-radius: 5px;
  background-color: gray;
  position: absolute;
  right: 110px;
  font-size: 12px;
  padding: 8px;
  color: #ffff;
`
const CancelBox = styled(StatusBox)`
  right: 20px;
  background-color: #212A3E;
  padding-left: 30px;
`

const DutyListBox = styled(AuualListBox)`
`
const DutyList = styled(AuualList)`
  font-family: 'LINESeedKR-Bd';
`


