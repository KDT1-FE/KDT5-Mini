import { styled } from 'styled-components'
import { signupTexts } from 'constants/index'
import { Link } from 'react-router-dom'
import { ActionField } from '@/components'

export const SignInCallToAction = () => {
  return (
    <>
      <ActionField>
        <ActionSpan>{signupTexts.hasAccount}</ActionSpan>
        <StyledLink to="/"> {signupTexts.toSignin}</StyledLink>
      </ActionField>
    </>
  )
}

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${props => props.theme.colors.primaryBlue};
  padding-left: 20px;
  font-weight: 700;

  &:visited {
    color: ${props => props.theme.colors.primaryBlue};
  }
`
const ActionSpan = styled.span`
  padding-right: 20px;
`
