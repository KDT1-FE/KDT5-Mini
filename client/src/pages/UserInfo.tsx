import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
import { hospitalDecode } from '@/utils/decode';
import { LoginBody, UserData } from '@/lib/types';
import { PWValidation, nameValidation, phoneValidation } from '@/lib/Validation';
import { UserDataState } from '@/states/stateUserdata';
import { useRecoilState } from 'recoil';
import { login, editMyPage } from '@/lib/api';
import { FiAlertCircle } from 'react-icons/fi';
import Loading from '@/components/Loading';

interface ProfileBody {
  name: string;
  password: string;
  deptName: string;
  phone: string;
  image: string;
}

interface EditProfileBody {
  name: string;
  deptId: number;
  phone: string;
  image: string | null;
}

interface Password {
  password: string;
}

interface deptDecode {
  [key: number]: string;
}

const UserInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileBody, LoginBody>({ mode: 'onChange' });

  const [user] = useRecoilState<UserData>(UserDataState);
  const [passwordChecked, setPasswordChecked] = useState<boolean>(false);
  const [imgPreview, setImgPreview] = useState<string>('/user.png');
  const [isLoading, setIsLoading] = useState(false);
  const userImg = watch('image');

  useEffect(() => {
    if (userImg && userImg.length > 0) {
      const file = userImg[0];
      if (typeof file !== 'string') {
        setImgPreview(URL.createObjectURL(file));
      } else {
        console.error('Invalid file type or not a File/Blob');
      }
    }
  }, [userImg]);

  // 비밀번호 재확인
  const checkPassword = async (password: Password) => {
    setIsLoading(true);
    const body = {
      email: user.email,
      password: password.password,
    };
    await login(body)
      .then(res => {
        if (res?.status === 200) {
          setPasswordChecked(!passwordChecked);
        }
      })
      .catch(error => console.error('비밀번호 확인 실패', error));
    setIsLoading(false);
  };

  // 개인정보 수정
  const editUserInfo = ({
    name = user.name,
    deptName,
    phone = user.phone,
    image = user.profileImageUrl,
  }: ProfileBody) => {
    const findKeyByValue = (obj: deptDecode, value: string): number => {
      for (const key in obj) {
        if (obj[key] === value) {
          return Number(key);
        }
      }
      return 0;
    };
    const deptId: number = findKeyByValue(hospitalDecode[user.hospitalId].dept, deptName);
    const body: EditProfileBody = {
      name,
      deptId,
      phone,
      image: image === null ? FileList.name : null,
    };
    if (confirm('개인정보를 수정하시겠습니까?')) {
      setIsLoading(true);
      editMyPage(body)
        .then(res => {
          if (res.success) {
            alert('개인정보 수정이 완료되었습니다.');
            location.reload();
          }
        })
        .catch(error => console.log('개인정보 수정 실패', error));
    }
    setIsLoading(false);
  };

  // 프로필 사진 업로드 핸들러
  // const uploadProfileImg = () => {
  //   const file = imgRef.current?.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setProfileImg(reader.result);
  //   };
  // };

  return (
    <>
      {!passwordChecked ? (
        <PWCheckContainer>
          {isLoading && <Loading />}
          <Title>
            <h2>비밀번호 확인</h2>
          </Title>
          <p>개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해 주세요.</p>
          <PWCheckFormWrapper onSubmit={handleSubmit(checkPassword)}>
            <PwCheckLabel>
              <div className="error">
                {errors?.password && (
                  <InfoBox>
                    <FiAlertCircle />
                    <div className="info-text">{errors.password.message}</div>
                  </InfoBox>
                )}
              </div>
              <Input
                type="password"
                maxLength={20}
                placeholder="현재 비밀번호를 입력해 주세요."
                {...register('password', PWValidation)}
              />
            </PwCheckLabel>
            <Btn content="확인하기" />
          </PWCheckFormWrapper>
        </PWCheckContainer>
      ) : (
        <UserInfoContainer>
          {isLoading && <Loading />}
          <Title>
            <h2>개인정보 수정</h2>
          </Title>
          <FormWrapper id="user-info" onSubmit={handleSubmit(editUserInfo)}>
            <ProfileImgWrapper>
              <img src={imgPreview} alt="프로필 이미지" />
            </ProfileImgWrapper>
            <Label className="profile">
              <ProfileImgEdit>변경</ProfileImgEdit>
              <Input type="file" accept="image/*" className="profile-img" {...register('image')} />
            </Label>
            <Label>
              name
              <Input type="text" defaultValue={user.name} {...register('name', nameValidation)} />
            </Label>
            <Label>
              Hospital
              <Select defaultValue={hospitalDecode[user.hospitalId].hospital}>
                <option value={hospitalDecode[user.hospitalId].hospital}>
                  {hospitalDecode[user.hospitalId].hospital}
                </option>
              </Select>
            </Label>
            <Label>
              Part
              <Select
                form="user-info"
                defaultValue={hospitalDecode[user.hospitalId].dept[user.deptId]}
                {...register('deptName')}
              >
                {Object.values(hospitalDecode[user.hospitalId].dept).map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </Label>
            <Label>
              Phone Number
              <Input type="text" defaultValue={user?.phone} {...register('phone', phoneValidation)} />
            </Label>
            <EditBtnWrapper>
              <Btn content="수정하기" />
            </EditBtnWrapper>
          </FormWrapper>
        </UserInfoContainer>
      )}
    </>
  );
};

export default UserInfo;

const PWCheckContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 20px;
  p {
    font-size: 0.9rem;
  }
`;

const PWCheckFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  /* height: 150px; */
`;

const PwCheckLabel = styled.label`
  /* display: flex; */
  /* flex-direction: column; */
  justify-content: center;
  /* align-items: flex-start; */
  width: 320px;
  /* gap: 10px; */
  /* border: 1px solid red; */
  margin-bottom: 20px;
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
  .error {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 20px;
    /* border: 1px solid red; */
    font-family: 'Pretendard', sans-serif;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-weight: 600;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 500px;
  height: 700px;
`;

const Label = styled.label`
  width: 320px;
  /* border: 1px solid red; */
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
  &.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Input = styled.input`
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
  &.profile-img {
    display: none;
  }
`;

const Select = styled.select`
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
  /* 브라우저 기본 디자인 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* 새로운 화살표 디자인 추가 */
  background: url(/arrow.png) calc(100% - 16px) center no-repeat;
  background-size: 14px;
  background-color: ${props => props.theme.white};
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ProfileImgEdit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 24px;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  font-family: 'Pretendard', sans-serif;
  font-size: 0.9rem;
  color: ${props => props.theme.white};
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const EditBtnWrapper = styled.div`
  margin-top: 20px;
`;
const InfoBox = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  color: red;
  font-size: 12px;
  .info-text {
    margin-left: 8px;
  }
`;
