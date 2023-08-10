import { UpdateForm } from 'components/form/index'
import { ProfileContext } from 'contexts/index'
import { useState } from 'react'

export const UpdatePage = () => {
  const [profileImage, setProfileImage] = useState<string>('')

  return (
    <>
      <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
        <UpdateForm />
      </ProfileContext.Provider>
    </>
  )
}
