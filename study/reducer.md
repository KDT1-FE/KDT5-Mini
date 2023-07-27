Reducer의 역할은 다음과 같습니다:

    현재의 상태(State)와 액션(Action)을 받아서 새로운 상태를 반환합니다.
    애플리케이션의 상태 변경 로직을 구현합니다.

상태를 변경하는 로직은 모두 Reducer 안에 있어야 하기 때문에, 애플리케이션의 상태가 어떻게 변경될지를 예측하고 이해하기 수월합니다. 이를 통해 시간에 따른 상태 변화를 이해하고 디버깅을 쉽게 할 수 있습니다.
그리고 각 Reducer는 보통 여러 개의 서브 리듀서로 구성할 수 있으며, <br> 
각 서브 리듀서는 애플리케이션의 특정 영역에 해당하는 상태를 관리합니다.</br> 
이를 통해 상태 관리의 단일 책임 원칙을 유지할 수 있습니다.

각 view page 들로 앱이나 웹으로 이뤄지는데 각 페이지마다 action (삭제,수정,등록) 등이 일어 날 수 있습니다.</br>
그 각각의 action 들을 집중적으로 관리함으로써 유지, 보수 등에서 유리합니다.

<ul>
    <li>예측 가능한 상태 변경: Reducer는 현재 상태와 액션을 입력으로 받아 새로운 상태를 반환하는 순수 함수입니다.<br> 
        이렇게 하면 상태 변경이 어떻게 이루어지는지 명확하게 알 수 있고, 동일한 입력에 대해서는 항상 동일한 출력을 얻을 수 있습니다.<br>
        이는 상태 변경을 예측 가능하게 만들고, 디버깅을 쉽게 해줍니다.
    </li>

    테스트 용이성: Reducer는 순수 함수이므로 테스트가 간편합니다. 외부 상태에 의존하지 않고, 부작용을 발생시키지 않으므로, 간단한 단위 테스트를 통해 기능을 검증할 수 있습니다.

    상태 변경 로직의 중앙집중화: Reducer를 사용하면 상태 변경 로직이 한 곳에 모여 있어, 애플리케이션의 복잡성을 관리하는 데 도움이 됩니다.

    상태 업데이트 로직의 재사용 및 분리: Reducer는 기능별로 분리할 수 있으므로, 상태 업데이트 로직을 재사용하거나 개별적으로 관리할 수 있습니다.

    Immutable update pattern: Reducer는 상태를 직접 변경하지 않고 새로운 상태를 생성하여 반환할 수 있습니다.<br> 
    이는 상태의 불변성을 유지하는 데 도움이 되며, 성능 최적화와 복잡한 상태 변경을 쉽게 관리할 수 있게 합니다.

    코드의 일관성: 모든 상태 업데이트가 Reducer를 통해 이루어지므로, 코드의 일관성을 유지하고, 유지보수와 이해를 쉽게 만들 수 있습니다.
</ul>
    
reducer는 주로 상태관리 기능을 함께 사용하는 예가 많습니다.
react 에서는 useReducer 라는 훅이 존재하여 상태관리 와 별도로 사용이 가능합니다.

```typescript jsx
 - reducer 
    import React, { useReducer } from 'react';

    const initialState = { isLoggedIn: false };
    
    function loginReducer(state, action) {
      // 
      switch (action.type) {
        case 'LOGIN':
          return { isLoggedIn: true };
        case 'LOGOUT':
          return { isLoggedIn: false };
        default:
          return state;
      }
    }
```

```typescript jsx
    
    function LoginControl() {
      const [state, dispatch] = useReducer(loginReducer, initialState);
    
      return (
        <div>
          {state.isLoggedIn ? (
            <div>
              <p>Welcome back!</p>
              <button onClick={() => dispatch({ type: 'LOGOUT' })}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <p>Please log in.</p>
              <button onClick={() => dispatch({ type: 'LOGIN' })}>
                Login
              </button>
            </div>
          )}
        </div>
      );
    }
    export default LoginControl;
```
사용법
```typescript jsx
    const [state, dispatch] = useReducer(reducer, initialState);
```
```typescript jsx
    import React, { useReducer } from 'react';

    function reducer(state, action) {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state - 1;
        default:
          return state;
      }
    }
    
    function Counter() {
      const [number, dispatch] = useReducer(reducer, 0);
    
      const onIncrease = () => {
        dispatch({ type: 'INCREMENT' });
      };
    
      const onDecrease = () => {
        dispatch({ type: 'DECREMENT' });
      };
    
      return (
        <div>
          <h1>{number}</h1>
          <button onClick={onIncrease}>+1</button>
          <button onClick={onDecrease}>-1</button>
        </div>
      );
    }
    
    export default Counter;
```

