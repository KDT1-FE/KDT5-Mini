import { styled } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TitleText } from 'components/index'
import { signupTexts } from 'constants/index'
import { ko } from 'date-fns/esm/locale'

export const DatePickerForm = ({ date, setDate }) => {
  //코드 더러움 수정 필요
  return (
    <>
      <DatePickerWrapper>
        <TitleText>{signupTexts.hireDate}</TitleText>
        <label>
          <i>
            <img src="/src/assets/calendarIcon.png" />
          </i>
          <DatePicker
            locale={ko}
            selected={date}
            onChange={date => {
              setDate(date)
            }}
            dateFormat="yyyy-MM-dd"></DatePicker>
        </label>
      </DatePickerWrapper>
    </>
  )
}

const DatePickerWrapper = styled.div`
  position: relative;
  img {
    width: 25px;
    height: 24px;
    position: absolute;
    z-index: 1;
    top: 53px;
    right: 40px;
    cursor: pointer;
  }
  input {
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding-left: 10px;
    width: 434px;
    height: 60px;
    margin-bottom: 6px;
    &::placeholder {
      font-size: 12px;
      opacity: 0.75;
    }
    &:focus {
      outline: 1px solid ${props => props.theme.colors.primaryBlue};
    }
  }
`
