import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updatePasswordApi } from '@/api/mypage/index'
import { updatePasswordData, updatePasswordReq } from '@/types/MypageTypes'
import { getCookie, removeCookie } from '@/utils/cookie'
import { emailRegex, passwordRegex } from '@/utils/constants/regex'
import styles from './MyInfo.module.scss'

const MyInfo: React.FC = () => {
  // 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인, 출력 메시지 상태 관리
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [message, setMessage] = useState<string | undefined>('')

  const navigate = useNavigate()

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 폼 제출 이벤트 방지

    // Local Storage에서 유저 이메일 가져오기
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null
    const userEmail = user?.email || ''

    // email 유효성 검사
    if (!emailRegex.test(userEmail)) {
      setMessage('유효한 이메일이 아닙니다. 이메일 주소를 확인해주세요.')
      return
    }

    // 새 비밀번호가 8자 이상인지 확인
    if (!passwordRegex.test(newPassword)) {
      setMessage('새 비밀번호는 최소 8자 이상이어야 합니다.')
      return
    }

    // 새 비밀번호와 확인 비밀번호의 일치 여부 확인
    if (newPassword !== confirmNewPassword) {
      setMessage('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }

    // 비밀번호 수정 api에 보내는 RequestBody
    const requestBody: updatePasswordReq = {
      email: userEmail,
      oldPassword,
      newPassword
    }

    try {
      const token = getCookie('token')
      const updatedData: updatePasswordData | undefined = await updatePasswordApi(token, requestBody)
      setMessage(updatedData?.message ?? '비밀번호 변경에 실패했습니다.')

      // 비밀번호 변경 성공 시 Local Storage, Cookie를 만료시켜 로그인 페이지로 이동
      if (updatedData?.message === '비밀번호가 정상적으로 변경되었습니다.') {
        alert('비밀번호가 정상적으로 변경되었습니다.\n로그인 페이지로 이동합니다.')
        localStorage.clear()
        removeCookie('token')
        navigate('/login')
      }
    } catch (error) {
      setMessage('비밀번호 변경에 실패했습니다.')
    }
  }

  return (
    <section className={styles.form__container}>
      <form onSubmit={handleFormSubmit}>
        <label>
          현재 비밀번호
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </label>
        <label>
          새 비밀번호
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <label>
          새 비밀번호 확인
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </label>
        <button>비밀번호 변경</button>
      </form>
      <div className={styles.form__description}>
        <p>{message}</p>
      </div>
    </section>
  )
}

export default MyInfo
