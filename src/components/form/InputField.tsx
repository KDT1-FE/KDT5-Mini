import { styled } from 'styled-components'

export const InputField = ({ fieldProps }) => {
  return (
    <>
      <TitleText>{fieldProps[2]}</TitleText>
      <Input
        onChange={e => fieldProps[0](e.target.value)}
        value={fieldProps[1]}
        placeholder={fieldProps[3]}
        ref={fieldProps[4]}
        type={fieldProps[5]}></Input>
    </>
  )
}

export const TitleText = styled.div`
  padding: 10px;
  line-height: 16px;
  letter-spacing: -0.48px;
  font-weight: 700;
`

const Input = styled.input`
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
`
