import { createContext } from 'react'

type ProfileState = {
  profileImage: string
  setProfileImage: (value: string) => void
}

export const ProfileContext = createContext<ProfileState>({} as ProfileState)
