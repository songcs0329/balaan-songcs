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

## 디렉토리 구조

```bash
src
├── components: 컴포넌트 모음
│		├── FormAddress.vue: 배송비정보 입력 컴포넌트
│		├── FormPersonal.vue: 개인정보 입력 컴포넌트
│		└── FormCardNumber.vue: 결제정보 입력 컴포넌트
├── constants:상수 모음
│		└── regexConst.ts: 정규식 상수 모음
├── router: 라우터(vue-router) 모음
│		└── index.ts
├── stores: 전역 state(pinia) 모음
│		└── signUp.ts: 회원가입 페이지 내 전역 step 관리용 store
├── styles: style관련 css 모음(sass)
│		├── color.scss: color값 변수 모음
│		├── commom.scss: reset-css에서 제외된 style reset을 위한 style
│		├── styles.scss: 실제로 프로젝트에서 사용하는 style 모음
│		└── index.scss: 위 3개의 scss를 import, main.ts에 해당 scss만 import
├── utils: 유틸함수 모음
│		├── numberUtil.ts: 숫자와 관련된 util 함수 모음(회원가입 완료 페이지 내 phone에 dash 추가)
│		└── validationUtil.ts: 회원가입 시 사용, form 내 입력값의 조건을 만족하는지 체크
├── views(router에서 각 path별로 랜더링 할 view)
│		├── SignUpView.vue: 회원가입 페이지 view
│		└── SignUpEndView.vue: 회원가입 완료 페이지 view
├── App.vue: 내부의 여러 컴포넌트를 통합하여 main.ts 전달
├── main.ts: Vue 애플리케이션 구동 시 기징 먼저 실행되는 파일
└── shims-vue.d.ts: Vue 컴포넌트의 정보를 타입스크립트에 제공
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
3. typescript
   ```
   프로젝트 내에서 타입스크립트 사용을 위해 사용하였습니다.
   ```
4. eslint
   ```
   일관성 있는 방식으로 구현하여 코드 퀄리티 보장을 위해 사용하였습니다. eslint를 사용하면 프로젝트에서 코드를 작성하는 방식을 일관성이 있는 방식으로 구현할 수 있도록 도와줍니다.
   ```
5. prettier
   ```
   	일관적인 코드 스타일링 유지를 위해 사용하였습니다.(Formatter의 역할)
   ```
6. reset-css
   ```
   브라우저마다 다른 default 값의 스타일을 통일시켜주기 위해 사용하였습니다.
   ```
7. sass
   ```
   프로젝트 내 컴포넌트 스타일링을 위해 사용하였습니다.
   ```
