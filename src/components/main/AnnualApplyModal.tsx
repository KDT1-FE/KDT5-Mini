import style from './AnnualApplyModal.module.scss'
import { DateClickInfo, Events } from '@/types/MainTypes'
import { annualUserData } from '@/types/MypageTypes'
import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { getCookie } from '@/utils/cookie'
import { annualApplyApi } from '@/api/main'

interface Props {
  dateInfo: DateClickInfo
  setShowModal: (showModal: boolean) => void
  myAnnual: annualUserData
  events: Events[]
}

const AnnaulApplyModal = ({ dateInfo, setShowModal, myAnnual, events }: Props) => {
  const [dateValue, setDateValue] = useState<string>(dateInfo.dateStr)
  const user = JSON.parse(localStorage.getItem('user') as string)
  const dateValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const current = new Date()
    if (e.target.value < current.toISOString().slice(0, 10)) {
      alert('오늘 이전 날짜는 선택할 수 없습니다.')
      return
    }
    const isAnnualExist = myAnnual.find((item) => item.date === e.target.value)
    if (isAnnualExist) {
      alert('이미 신청한 연차가 있습니다.')
      return
    }
    const truncatedName = user.name.length > 6 ? user.name.slice(0, 6) : user.name
    const isWorkExist = events.find(
      (item) =>
        item.date === e.target.value &&
        item.backgroundColor === '#ff7976' &&
        item.title === truncatedName + user.employeeNumber
    )
    if (isWorkExist) {
      alert('당일 당직 일정이 있습니다.')
      return
    }
    setDateValue(e.target.value)
  }

  const applyHandler = async () => {
    //연차 신청 전에, 전체 연차 개수가 15개 이상인지 확인
    const annualCount = myAnnual.length
    if ((annualCount as number) >= 15) {
      alert('연차를 15일 이상 사용하실 수 없습니다.')
      return
    }
    //현재 있는 이벤트 중에, 클릭한 날짜에 유저가 신청한 연차가 있는지 확인
    const isExist = myAnnual.find((item) => item.date === dateValue)
    if (isExist) {
      alert('이미 신청한 연차가 있습니다.')
      return
    }
    //연차 신청
    await annualApplyApi(getCookie('token'), { date: dateValue }).then((res) => {
      if (Array.isArray(res)) {
        alert('연차 신청에 실패했습니다.')
      } else {
        alert('연차 신청이 완료되었습니다! 관리자 승인 후 반영됩니다.')
      }
    })

    setShowModal(false)
  }

  const modalCloseHandler = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.modalHeader}>
          <span className={style.title}>{dateValue}</span>
          <div className={style.icon} onClick={modalCloseHandler}>
            <IoIosClose />
          </div>
        </div>
        <div className={style.applyContent}>
          <span className={style.title}>연차 신청하기</span>
          <input className={style.date} type="date" value={dateValue} onChange={dateValueHandler} />
          <div className={style.applyWrapper}>
            <div className={style.des}>해당일자에 연차를 신청하시겠습니까?</div>
            <button className={style.applyBtn} onClick={applyHandler}>
              신청하기
            </button>
          </div>
        </div>
      </div>
      <div className={style.background} onClick={modalCloseHandler}></div>
    </>
  )
}

export default AnnaulApplyModal
