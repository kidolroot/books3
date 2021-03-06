# Book Shelf
> ๐ Book Shelf Web Application in TypeScript, React and Redux.
---
### 1. ๊ฐ๋ฐ ํ๊ฒฝ ์ด๊ธฐํ
```shell
npx create-react-app . --template typescript
```

### 2. ๋ผ์ฐํ์ ์ํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค๋น
```shell
yarn add react-router-dom
yarn add @types/react-router-dom -D # ํ์์คํฌ๋ฆฝํธ๋ฅผ ์ํจ
```

### 3. ์๋ฌ ํธ๋ค๋ง ํ์ด์ง ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค๋น
```shell
yarn add react-error-boundary # componentDidPatch๋ก ๋ฐํ์ ์๋ฌ ํธ๋ค๋ง โ ์๋ฌ ํ์ด์ง๋ก ์ด๋์ํจ๋ค.
```
```tsx
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error from './pages/Error';

<ErrorBoundary FallbackComponent={Error}>
  <BrowserRouter>
    <Switch>
      <Route />
        {/* ... */}
    </Switch>
  </BrowserRouter>
</ErrorBoundary>
```

### 4. ๋น๋๊ธฐ ์ฒ๋ฆฌ๋ฅผ ์ํ Redux ์ค๋น
```shell
yarn add redux react-redux redux-saga redux-devtools-extension redux-actions
yarn add @types/{react-redux,redux-actions} -D
```
```
.
โโโ src
    โโโ redux
        โโโ create.ts
        โโโ modules
            โโโ reducer.ts
            โโโ auth.ts
            โโโ rootSaga.ts
```

### 5. ๋์์ธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ Ant Design ์ค๋น
```shell
yarn add antd
yarn add @ant-design/icons
```
```tsx
// index.tsx
import 'antd/dist/antd.css';
```

### 6. ๋ก๊ทธ์ธ ์ค๊ณ

#### 6-1.`useRef`๋ฅผ ํ์ฉํ Uncontrolled Component ๋ฐฉ์์ผ๋ก input ๋ฐ์ดํฐ ๊ด๋ฆฌ
```tsx
// signin.tsx
/* ... */
const emailRef = useRef<Input>(null); // null ํ ๋น์ ํตํด ํ์ ์๋ฌ ๋ฐฉ์ง
/* ... */
<Input ref={emailRef} />
/* ... */
```
#### 6-2. ๋ก๊ทธ์ธ API ํธ์ถ ํจ์ ํ์ ์ ์
children์ ์ ์ธํ๊ณ ๋ `interface`์์ ์ ์ํ ํ์๊ณผ Component์ `props`๊ฐ ๋์ผํด์ง๋๋ค.  
```tsx
// Signin.tsx (Component)
type LoginReqType = { // types.ts๋ก ๋ถ๋ฆฌํจ์ผ๋ก์จ ์ฌ์ฌ์ฉํ๊ฒ ํจ
  email: string;
  password: string;
};

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  return <div></div>;
};
```

```tsx
// SigninContainer.tsx (Container)
export default function SigninContainer() {
  const login = useCallback((reqData) => {
    /* saga ํจ์ ํธ์ถ ๋ฐ ๋น๋๊ธฐ ์ฒ๋ฆฌ ๋ถ๋ถ */
  }, []);
  return <Signin login={login} />;
}
```

#### 6-3. `saga`์์ ๋น๋๊ธฐ ๋ก์ง ๋ถ๋ถ์ `Service` ๋ชจ๋๋ก ์์

```
.
โโโ src
    โโโ redux
    โ   โโโ create.ts
    โ   โโโ modules
    โ       โโโ reducer.ts
    โ       โโโ auth.ts
    โ       โโโ rootSaga.ts
    โ
    โโโ services
    โ   โโโ UserService.ts
    โ
    โโโ types.ts
```

```tsx
// services/UserService.ts

/* Token ๋ฐ๊ธ์ ์ํ API ๋ก์ง ๋ถ๋ฆฌ */
import axios from 'axios';
import { LoginReqType } from '../types';

const USER_API_URL = '';

/* API */
export default class UserService {
  public static async login(reqData: LoginReqType): Promise<string> {
    const response = await axios.post(USER_API_URL, reqData);
    return response.data.token;
  }
}
```

### husky
```shell
npx husky install
yarn add lint-staged -D
npx husky add .husky/pre-commit 'lint-staged'
```