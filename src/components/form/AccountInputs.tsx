import { styled } from 'styled-components'

export const AccountInputs = ({
  upper,
  lower,
  phFirst,
  phSecond,
  value,
  fn,
  type
}) => {
  return (
    <div>
      <InputRow>
        <StyledSpan>{upper}</StyledSpan>
        {/* INPUT TYPE CLARIFICATION REQUIRED */}
        <StyledInput
          placeholder={phFirst}
          value={value[0]}
          onChange={e => fn[0](e.target.value)}
          type={type}></StyledInput>
      </InputRow>
      <InputRow>
        <StyledSpan>{lower}</StyledSpan>
        <StyledInput
          placeholder={phSecond}
          value={value[1]}
          onChange={e => fn[1](e.target.value)}
          type={type}></StyledInput>
      </InputRow>
    </div>
  )
}

const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid ${props => props.theme.colors.borderGrey};
  border-radius: 10px;
  width: 434px;
  height: 50px;
  margin-bottom: 18px;
  background-color: ${({ value, theme }) =>
    value ? `${theme.colors.inputFocused}` : `${theme.colors.white}`};
  padding-left: 10px;
  &:focus {
    background-color: ${props => props.theme.colors.inputFocused};
    outline: none;
  }
`
const StyledSpan = styled.span`
  display: block;
  width: 200px;
  padding-top: 15px;
`
const InputRow = styled.div`
  display: flex;
`
