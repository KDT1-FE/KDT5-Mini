import baseApi from '@/api'
import { LoginReq, SignupReq, LoginResData, SignupResData, LogoutResData } from '@/types/AccessTypes'
//login
export const loginApi = async (data: LoginReq) => {
  try {
    const res = await baseApi.post('/login', data)
    if (res.status === 200) {
      return res.data.data as LoginResData
    }
  } catch (error: any) {
    console.error('로그인 api 오류', error)
    alert(`로그인에 실패했습니다. ${error.response.data.errorMessage}`)
  }
}

//signUp
export const signupApi = async (data: SignupReq) => {
  try {
    const res = await baseApi.post('/signup', data)
    if (res.status === 200) {
      return res.data.data as SignupResData
    }
  } catch (error: any) {
    console.error('회원가입 api 오류', error)
    alert(`회원가입에 실패했습니다. ${error.response.data.errorMessage}`)
  }
}

//logout
export const logoutApi = async (token: string) => {
  try {
    const res = await baseApi({
      method: 'POST',
      url: '/logout',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      return res.data.data as LogoutResData
    }
    if (res.data.errorMessage) {
      return res.data.errorMessage 
    }
  } catch (error) {
    console.error('로그아웃 api 오류', error)
  }
}

export const adminAuthApi = async (token: string) => {
  try {
    const res = await baseApi({
      method: 'GET',
      url: '/admin',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res
  } catch (error: any) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      return error.response.data
    } else {
      console.error('관리자 권한 확인 api 오류', error)
    }
  }
}
