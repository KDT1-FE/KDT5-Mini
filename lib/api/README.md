# API 호출 함수 작성 요령

## 개요

axios 인스턴스를 만들게 되면 저희가 API 클라이언트에 공통된 설정을 쉽게 넣어서 <br />
관리할 수 있습니다. <br />
저희가 공부할 때는 인스턴스를 따로 만들지 않고 API 호출 함수에 직접 설정을 넣어서
만들어왔습니다.

그러나 이런 경우에는 애플리케이션에서 일어나는 모든 요청에 대해서 일일히 설정을 하기 때문에 작업하는데<br />
상당히 번거로울 수 있지요.<br />
그래서 인스턴스를 만들어놓고 그 안에 header같은 설정을 넣어주게 되면 그런 번거로운 일없이 쉽게 작업할 수 있습니다.

## 인스턴스 만드는 요령

이미 제가 만들어놨기 때문에 사실 편하게 사용하시면 되지만, 그래도 프론트 팀원분들이 알아두시면,<br />
편하게 사용할 수 있기 때문에 하나 알려드리려고 합니다.

우선 저의 경우는 루트 디렉토리나 src에 lib라는 폴더를 하나 만들어 놓고, 그 안에 api라는 폴더를 하나 더 생성합니다.

그런 다음 폴더 안에 client.ts 혹은 client.js를 생성합니다.

다음 같이 인스턴스를 작성해보세요.

```typescript
// TypeScript (client.ts)
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "URL 주소";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  header: {
    // header 속성
  },
};

const client = axios.create(axiosConfig);

export default client;
```

```javascript
// JavaScript (client.js)
import axios from "axios";

const BASE_URL = "URL 주소";

const axiosConfig = {
  baseURL: BASE_URL,
  header: {
    // header 속성
  },
};

const client = axios.create(axiosConfig);

export default client;
```

간단하죠? 이제 API 함수를 만들 준비가 다 끝이 났습니다.

## API 함수 만들기

이제 만든 인스턴스로 API 함수를 만들어보겠습니다. API 함수는 동일한 디렉토리에 생성해보겠습니다.<br />
저는 testAPI.ts로 만들어보도록 할게요.

```typescript
import client from "./client";

export const getAPI = () => {
  const result = client.get(
    // `API 주소 쿼리문만 입력`
    `api/...`,
    {
      // 데이터
    },
  );
  return result;
};
```

이제 getAPI라는 함수를 꺼내서 사용하시면 됩니다.
```typescript
import getAPI from './testAPI';

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await getAPI();
    } catch (e) {
      console.error(e, '오류 발생');
    }
  }
}, []);
```
이런 식으로 사용하시면 API 호출이 완료됩니다.