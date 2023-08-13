import AuthBox from '@/components/auth/AuthBox';
import SearchSiteButton from '@/components/common/SearchSiteButton';

export default function AuthSentEmailBox() {
  const handleNaverClick = () => {
    window.location.href = 'https://www.naver.com';
  };
  const handleGoogleClick = () => {
    window.location.href = 'https://www.google.com';
  };

  const handleKakaoClick = () => {
    window.location.href = 'https://mail.kakao.com/';
  };

  return (
    <AuthBox>
      <div className="mb-8 text-3xl flex justify-center ">
        입력하신 이메일로 비밀번호가 전송되었습니다.
      </div>
      <div className="text-subTextAndBorder mb-8 text-xl flex justify-center">
        입력하신 이메일을 확인하여 계정의 비밀번호를 재설정하세요.
      </div>
      <div className="flex gap-4 sm:mt-16">
        <SearchSiteButton
          contents={'네이버'}
          onClick={handleNaverClick}
          site={'naver'}
        />
        <SearchSiteButton
          contents={'구글'}
          onClick={handleGoogleClick}
          site={'google'}
        />
        <SearchSiteButton
          contents={'카카오'}
          onClick={handleKakaoClick}
          site={'kakao'}
        />
      </div>
    </AuthBox>
  );
}
