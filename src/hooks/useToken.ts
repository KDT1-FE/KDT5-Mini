import { Cookies } from 'react-cookie';

export const useAccessToken = () => {
  const cookie = new Cookies();
  const token = cookie.get('accessToken');
  return token;
};

export default useAccessToken;
