import { styled } from 'styled-components'
import { BaseRow, BaseCol } from 'components/index'
import { AccountInputs } from 'components/form/index'

export const UpdateInputForm = ({ texts, value, fn }) => {
  return (
    <>
      <AccountRow>
        <BaseCol>{texts[0]}</BaseCol>
        <AccountInputs
          upper={texts[1]}
          lower={texts[2]}
          phFirst={texts[3]}
          phSecond={texts[4]}
          value={value}
          fn={fn}
          type={texts[5]}
        />
      </AccountRow>
    </>
  )
}

const AccountRow = styled(BaseRow)`
  padding-top: 24px;
`
