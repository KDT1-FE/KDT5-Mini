React Query는 React 애플리케이션에서 비동기 데이터를 가져오고, 캐싱하고, 동기화하고, 업데이트하는 데 도움을 주는 라이브러리입니다.
이 라이브러리는 서버 상태를 클라이언트에 동기화하는 문제를 해결하도록 설계되었습니다.

React Query의 주요 기능은 다음과 같습니다.

Data Fetching: React Query는 원격 데이터 소스에서 데이터를 효율적으로 가져오는 데 도움이 됩니다.

Caching: React Query는 데이터를 자동으로 캐시하여 동일한 요청에 대해 중복된 네트워크 호출을 줄입니다.

<span style="color:red">Synchronization</span>: 데이터가 변경될 때 React Query는 해당 데이터를 사용하는 모든 컴포넌트에 대해 자동으로 리렌더링을 트리거하여
애플리케이션의 전체적인 상태를 동기화하는 데 도움이 됩니다.

Background Updates: React Query는 비활성화된 탭이나 화면에서도 데이터를 자동으로 업데이트 할 수 있습니다.

React Query를 사용하면 복잡한 상태 관리 로직을 줄이고, 데이터를 가져오고 캐싱하는 과정을 간소화 할 수 있습니다.

- ## 사용 방법
React Query의 QueryClient와 QueryClientProvider를 사용하여 전역 설정을 할 수 있습니다.

이들은 각각 React Query 의 클라이언트와 프로바이더입니다. 프로바이더를 사용하여 QueryClient 인스턴스를 애플리케이션의 가장 최상위 레벨에서 제공함으로써, 애플리케이션의 어디에서나 Query를 사용할 수 있도록 합니다.
먼저, QueryClient를 생성해야 합니다. 그리고 이 클라이언트를 QueryClientProvider에 전달합니다. </br>
아래는 기본적인 사용 방법입니다:

1. <span style="color:red">Provider</span></br>
   ```typescript jsx
   import { QueryClient, QueryClientProvider } from 'react-query'
   const queryClient = new QueryClient()
   function App() {
   return (
   <QueryClientProvider client={queryClient}>
        <App />
   </QueryClientProvider>
      )
   }
    ```

    QueryClientProvier 사용하여 적용 범위를 설정 합니다.</br>
    QueryClientProvider는 이 설정을 애플리케이션의 모든 곳에서 사용할 수 있도록 제공합니다.

<span style="color:skyblue">main.tsx 참조 : 전체 provider 설정등이 있습니다.</span></br></br>
   
   
2. useQuery </br>
   비동기 데이터 가져오기를 위한 커스텀 훅입니다.</br>
   useQuery는 데이터를 가져오고, 캐싱하고, 동기화하고, 업데이트하는 기능을 제공합니다.
   ```typescript jsx
   const { data, error, isLoading, isError } = useQuery(['todos'], fetchTodos)
   const { data, error, isLoading,} = useQuery(['캐시키이름'], 비동기함수)
   ```
Query Key: 'todos'와 같이 고유한 문자열입니다.</br> 
이것은 캐시에 데이터를 저장하고 검색하는 데 사용됩니다. </br> 
QueryKey는 변경되면, useQuery는 자동으로 새로운 데이터를 가져옵니다.

Fetch Function: fetchTodos와 같은 데이터를 가져오는 함수입니다.</br> 
이 함수는 Promise를 반환해야 합니다.</br>

또한, useQuery는 객체를 반환합니다. 이 객체에는 아래와 같은 속성이 있습니다.

    data: Fetch 함수가 성공적으로 완료되면 반환되는 데이터입니다.

    error: Fetch 함수가 오류를 던지면 반환됩니다.

    isLoading: Fetch 함수가 아직 완료되지 않았을 경우 true로 설정됩니다.

    isError: Fetch 함수가 오류를 던졌을 경우 true로 설정됩니다.

이렇게 useQuery를 사용하면, 비동기 데이터를 가져오는 과정을 단순화하고, 자동 캐싱, 
백그라운드 업데이트, 오류 처리 등의 기능을 이용할 수 있습니다. 

<span style="color:skyblue">useData-Query.tsx 참조</span>
```typescript jsx
    const getPageData =
    useQuery(['myData'], getMyPage,{staleTime: 1000 * 60})
    return { getPageData };
```
이렇게 useQuery를 사용하면, 비동기 데이터를 가져오는 과정을 </br> 
단순화하고, 자동 캐싱, 백그라운드 업데이트, 오류 처리 등의 기능을 이용할 수 있습니다.

3.mutaion
React Query의 useMutation 훅은 API로 데이터를 생성,</br>
업데이트, 삭제하는 등의 변경(mutating) 작업을 수행하는데 사용됩니다. </br>
이는 서버에 영향을 주는 비동기 작업을 쉽게 관리할 수 있도록 도와줍니다.

```typescript jsx
    import { useMutation } from 'react-query';
    const mutation = useMutation( newTodo => axios.post('/todos', newTodo), {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
            // todos 라는 캐쉬 데이터를 삭제하고 즉시 새로 캐쉬데이터를 갱신하게 한다.
        },
    });
```

useMutation은 첫 번째 인자로 변이 함수를 받습니다. </br>
이 함수는 서버에 영향을 미치는 비동기 작업을 수행하며, 이 경우에는 새로운 할 일을 생성하는 POST 요청입니다.</br>
두 번째 인자로는 옵션 객체를 받습니다. 이 객체는 다양한 콜백 함수를 정의할 수 있습니다. </br> 
위 예제에서는 onSuccess 콜백을 사용하여 변이가 성공적으로 완료되면 'todos' 쿼리를 무효화하도록 설정했습니다. </br>
이렇게 하면 변이 후에 쿼리가 자동으로 재실행되어 최신 상태를 반영할 수 있습니다.</br></br>

변이를 실행하기 위해 mutation.mutate 메서드를 사용합니다:

```typescript jsx
    mutation.mutate({ id: 1, name: 'New Todo' });
```
mutation.mutate 메서드는 변이 함수에 전달되는 인자를 받습니다.

useMutation 훅은 또한 다음과 같은 상태 정보를 반환합니다:

    isLoading: 변이가 진행 중일 때 true입니다.
    isError: 변이에서 오류가 발생했을 때 true입니다.
    error: 변이에서 발생한 오류 객체입니다.
    data: 변이의 결과 데이터입니다.
    isSuccess: 변이가 성공적으로 완료되었을 때 true입니다.

이렇게 useMutation을 사용하면 서버의 데이터를 변경하는 비동기 작업을 쉽게 관리할 수 있습니다.
mutation 예제

```typescript jsx
     const createTodo = async (newTodo) => {
     const response = await axios.post('/api/todos', newTodo);
     return response.data;
   }
```
```typescript jsx
     import { useMutation, useQueryClient } from 'react-query';
      export function TodoForm() {
        const queryClient = useQueryClient();
        const mutation = useMutation(createTodo, {
          onSuccess: () => {
            queryClient.invalidateQueries('todos');
          },
        });
      
        const onSubmit = (data) => {
          mutation.mutate(data);
        }
      
        return (
          <form onSubmit={onSubmit}>
            {/* form elements */}
          </form>
        );
      }
```
TodoForm 컴포넌트의 onSubmit 핸들러는 mutation.mutate를 호출하여 변이를 실행합니다.</br>
이 때, data는 createTodo 함수에 전달됩니다. </br>
변이가 성공적으로 완료되면, 'todos' 쿼리가 무효화되어 최신 상태를 반영하도록 되어있습니다.</br></br>

useMutation의 반환값 중 isLoading, isError, error, isSuccess 등을 사용하면,</br> 
변이의 상태에 따라 UI를 조건부로 렌더링하는 것도 가능합니다.</br>

```typescript jsx
      import { useMutation, useQueryClient } from 'react-query';
      import axios from 'axios';
      
      const createTodo = async (newTodo) => {
        const response = await axios.post('/api/todos', newTodo);
        return response.data;
      }
      
      function TodoForm() {
        const queryClient = useQueryClient();
        const mutation = useMutation(createTodo, {
          onSuccess: () => {
            queryClient.invalidateQueries('todos');
          },
        });
      
        const onSubmit = (data) => {
          mutation.mutate(data);
        }
      
        return (
          <div>
            <form onSubmit={onSubmit}>
              {/* form fields */}
            </form>
      
            {mutation.isLoading && (
              <p>Adding new todo...</p>
            )}
      
            {mutation.isError && (
              <p>An error occurred: {mutation.error.message}</p>
            )}
      
            {mutation.isSuccess && (
              <p>New todo added successfully!</p>
            )}
          </div>
        );
      }
      export default TodoForm;
```





</br></br></br>커스텀 훅을 이용하여 한곳에서 react-query 관리하는 예제 - 추천 구조

```typescript jsx
    import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
    import { deleteExpense, getSearchExpense, postExpense, putChange } from "@/Api/api.ts";
    import dayjs from "dayjs";


    export default function useDataQuery(params?: SearchParamsType) {

    const queryClient = useQueryClient();

    const getSearchData =
        useQuery(["searchData", params], () => {
          if (params) {
            return getSearchExpense(params).then((res) => {
              return res.map((item: searchParamsTypeOutput) => ({
                ...item,
                date: dayjs(item.date).format("YYYY-MM-DD")
              }));
            });
          } else {
            return [];
          }
        }, { staleTime: 1000 * 60 });

      const addExpend =
        useMutation((postData: ExpendType) => postExpense(postData), {
          onSuccess: () => {
            queryClient.invalidateQueries(["searchData"]);
            //searchData 라는 캐쉬 값을 갱신합니다.
            queryClient.invalidateQueries(["summaryData"]);
            //searchData 라는 캐쉬 값을 갱신합니다.
          }
        });
      const deleteExpend =
        useMutation((id: string) => deleteExpense(id), {
          onSuccess: () => {
            queryClient.invalidateQueries(["searchData"]);
            queryClient.invalidateQueries(["summaryData"]);
          }
        });
      const changeExpend =
        useMutation(({ id, data }: { id: string, data: ExpendType }) =>
          putChange(id, data), {
          onSuccess: () => {
            queryClient.invalidateQueries(["searchData"]);
            queryClient.invalidateQueries(["summaryData"]);
          }
        });
      return { addExpend, getSearchData, changeExpend, deleteExpend, };
      // return 문을 사용하여 외부에서 접근이 가능하도록 설정
    }
```
4. 외부에서 캐쉬값에 접근하기 </br>
React Query는 자동 캐싱 기능을 제공하며, </br>
훅 밖에서 캐시에 접근하려면 queryClient.getQueryData를 사용하면 됩니다.</br> 
이 메소드는 query key를 인자로 받아 해당 쿼리의 캐시 데이터를 반환합니다.

```typescript jsx
    const { data } = useQuery("todos", fetchTodos);
    // 위 캐쉬값이 어딘가 다른곳에 잇다 가정을 하면
   import { QueryClient } from "react-query";

   const queryClient = new QueryClient();
    // QueryClient 로 캐쉬값에 접근할 세팅을 합니다.
   const todos = queryClient.getQueryData("todos");
   // 전역변수나 redux 처럼 캐쉬값에 접근이 가능합니다.
```


 