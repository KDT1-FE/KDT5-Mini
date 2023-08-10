import { styled } from 'styled-components'
import { UpdateTexts } from 'constants/index'
import { useRef, useContext } from 'react'
import { BaseRow, BaseCol } from 'components/index'
import { ProfileContext } from 'contexts/index'
import DefaultImage from 'assets/dafault.png'

export const UpdateImageForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { profileImage, setProfileImage } = useContext(ProfileContext)

  const handleLoadImage = e => {
    if (!e.target.files?.length) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])

    reader.onloadend = () => {
      const base64 = reader.result
      if (base64) {
        setProfileImage(base64?.toString())
      }
    }
  }

  // 수정 버튼 FileReader
  const onClickFileInput = e => {
    e.preventDefault()
    if (!fileInputRef.current) {
      return
    }
    fileInputRef?.current?.click()
  }

  const handleRemoveImage = () => {
    if (profileImage) {
      setProfileImage(DefaultImage)
    }
  }

  return (
    <div>
      <BaseRow>
        <ImageCol>{UpdateTexts.profile}</ImageCol>
        <ImageFrame>
          <Profile imageurl={profileImage || ''} />
          <ImageInput
            type={'file'}
            ref={fileInputRef}
            onChange={handleLoadImage}
          />
        </ImageFrame>
        <ProfileButtons>
          <ProfileButton onClick={onClickFileInput}>
            {UpdateTexts.upload}
          </ProfileButton>
          <ProfileButton onClick={handleRemoveImage}>
            {UpdateTexts.delete}
          </ProfileButton>
        </ProfileButtons>
      </BaseRow>
    </div>
  )
}

const ProfileButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 120px;
  height: 40px;
  border-radius: 8px;
  text-align: center;
  color: ${props => props.theme.colors.updateGrey};
  font-size: 14px;
  border: 1px solid ${props => props.theme.colors.buttonGrey};
  margin-right: 20px;
  &:hover {
    background-color: ${props => props.theme.colors.buttonGrey};
    color: ${props => props.theme.colors.white};
    font-weight: 700;
    transition: 0.2s ease-out;
  }
`

const ProfileButtons = styled.div`
  display: flex;
  align-items: center;
`

const Profile = styled.div<{ imageurl?: string }>`
  border-radius: 16px;
  width: 116px;
  height: 116px;
  background-image: url(${props => props.imageurl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const ImageInput = styled.input`
  border-radius: 16px;
  width: 116px;
  height: 116px;
  display: none;
`

const ImageFrame = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
`
const ImageCol = styled(BaseCol)`
  align-items: center;
  margin-bottom: 34px;
  padding-top: 34px;
`
