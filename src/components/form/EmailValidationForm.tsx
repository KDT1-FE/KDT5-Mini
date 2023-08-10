import { InputField } from 'components/index'
import { styled } from 'styled-components'
import { checkEmailAvailable } from 'api/index'
import { AxiosResponse, AxiosError } from 'axios'
import { signupTexts } from 'constants/index'

interface EmailResponse extends AxiosResponse {
  response: {
    email: string
    available: boolean
  }
}

export const EmailValidationForm = ({
  setEmail,
  email,
  title,
  ph,
  setIsEmailInUse
}) => {
  const handleEmailCheck = async () => {
    try {
      const res: EmailResponse = await checkEmailAvailable(email)

      const available = email && res?.response?.available

      // 중복되는 이메일이 있는 경우 (해당 이메일로 가입 불가능)
      if (!available) {
        setIsEmailInUse(false)
        alert(`${signupTexts.emailInUse}`)
        return
      }

      // 중복되는 이메일이 없는 경우 (해당 이메일로 가입 가능)
      setIsEmailInUse(true)
      alert(`${signupTexts.emailAvailable}`)
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err)
        alert(err)
      }
    }
  }

  const ValidationProps = [setEmail, email, title, ph, null, 'text']

  return (
    //코드 더러움 수정 필요
    <ValidationFormWrapper>
      <label>
        <i>
          <span
            className="material-symbols-outlined"
            onClick={handleEmailCheck}>
            mail
          </span>
        </i>
        <InputField fieldProps={ValidationProps} />
      </label>
    </ValidationFormWrapper>
  )
}

const ValidationFormWrapper = styled.div`
  position: relative;
  span {
    font-size: 32px;
    position: absolute;
    z-index: 1;
    top: 50px;
    right: 36px;
    cursor: pointer;
  }
`
