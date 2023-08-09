import { logoutApi } from '@/api/user';
import { removeCookie, getCookie } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';

const handleLogout = async (to: string, navigate: ReturnType<typeof useNavigate>) => {
  try {
    const token = getCookie('token');
    const res = await logoutApi(token);
    
    if (!res || (res.status === 401)) {
      // 응답이 없거나 401 상태 코드를 받으면 토큰을 강제로 제거하고 사용자를 로그인 페이지로 이동
      removeCookie('token');
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }

    if (Array.isArray(res)) {
      console.error(res[0]);
    } else {
      removeCookie('token');
      localStorage.removeItem('user');
      alert(res.message);
      navigate(to);
    }

  } catch (error) {
    console.error('로그아웃 실패', error);

    // 예기치 않은 오류의 경우 처리
    removeCookie('token');
    localStorage.removeItem('user');
    navigate(to);
  }
};

export default handleLogout;
