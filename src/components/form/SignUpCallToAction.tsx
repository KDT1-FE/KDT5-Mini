import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { signinTexts } from 'constants/index'

export const SignUpCallToAction = () => {
  return (
    <div>
      <SignupField>
        <ResetLink to="/reset"> {signinTexts.forgotPwd}</ResetLink>
        <SignupLink to="/signup">{signinTexts.signup}</SignupLink>
      </SignupField>
    </div>
  )
}

export const ActionField = styled.div`
  width: 434px;
  display: flex;
  justify-content: center;
  margin: 0 10px;
  font-size: 14px;
`
const SignupLink = styled(Link)`
  text-decoration: none;
  padding: 0 30px;
  color: black;

  &:visited {
    color: black;
  }
`

const ResetLink = styled(SignupLink)`
  border-right: 1px solid black;
`

const SignupField = styled(ActionField)`
  height: 16px;
  span {
    padding-right: 20px;
  }
`
