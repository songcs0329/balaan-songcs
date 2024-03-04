# 발란 FE 사전과제

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 사용한 패키지와 용도

1. pinia
   ```
   SignUpView의 회원가입 과정(step) state를 전역으로 관리하기 위해 사용하였습니다.
   ```
2. vue-router

   ```
   회원가입, 회원가입 완료 페이지 router path 및 컴포넌트 분리를 위해 사용하였습니다.
   ```

3. reset-css
   ```
   브라우저마다 다른 default 값의 스타일을 통일시켜주기 위해 사용하였습니다.
   ```
