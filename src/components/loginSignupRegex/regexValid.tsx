import { useState, useEffect } from 'react'
import { Tooltip } from 'antd'
import { emailRegex, passwordRegex, nameRegex } from '@/utils/constants/regex'
import style from './regexValid.module.scss'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onValidate: (isValid: boolean, index?: number) => void
}

export const EmailInput = ({ value, onChange, onValidate }: InputProps) => {
  const [emailValidateText, setEmailValidateText] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)

  useEffect(() => {
    const isValid = emailRegex.test(value)
    if (value === '') {
      setEmailValidateText('🙂이메일을 입력해주세요.')
    } else {
      setEmailValidateText(
        emailRegex.test(value) ? '✅올바른 이메일 형식입니다.' : '❌이메일 형식이 올바르지 않습니다.'
      )
    }
    if (onValidate) {
      onValidate(isValid, 0)
    }
  }, [value])

  return (
    <Tooltip title={emailValidateText} open={emailFocused} placement="right">
      <input
        className={style.input}
        type="email"
        placeholder="이메일을 입력해주세요"
        value={value}
        onChange={onChange}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        required
      />
    </Tooltip>
  )
}

export const PasswordInput = ({ value, onChange, onValidate }: InputProps) => {
  const [passwordValidateText, setPasswordValidateText] = useState('')
  const [passwordFocused, setPasswordFocused] = useState(false)

  useEffect(() => {
    const isValid = passwordRegex.test(value)
    if (value === '') {
      setPasswordValidateText('🙂비밀번호를 입력해주세요.')
    } else {
      setPasswordValidateText(
        passwordRegex.test(value) ? '✅올바른 비밀번호 형식입니다.' : '❌8자 이상으로 작성해주세요'
      )
    }
    if (onValidate) {
      onValidate(isValid, 1)
    }
  }, [value])

  return (
    <Tooltip title={passwordValidateText} open={passwordFocused} placement="right">
      <input
        className={style.input}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={value}
        onChange={onChange}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        required
      />
    </Tooltip>
  )
}

export const NameInput = ({ value, onChange, onValidate }: InputProps) => {
  const [nameValidateText, setNameValidateText] = useState('')
  const [nameFocused, setNameFocused] = useState(false)

  useEffect(() => {
    const isValid = nameRegex.test(value)
    if (value === '') {
      setNameValidateText('🙂이름을 입력해주세요.')
    } else {
      setNameValidateText(nameRegex.test(value) ? '✅올바른 이름 형식입니다.' : '❌20자 이하로 작성해주세요')
    }
    if (onValidate) {
      onValidate(isValid, 2)
    }
  }, [value])

  return (
    <Tooltip title={nameValidateText} open={nameFocused} placement="right">
      <input
        className={style.input}
        type="text"
        placeholder="이름을 입력해주세요"
        value={value}
        onChange={onChange}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        required
      />
    </Tooltip>
  )
}
