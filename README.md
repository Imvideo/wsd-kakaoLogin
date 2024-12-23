# jysmoviekakao

jysmoviekakao는 사용자 친화적인 UI를 통해 영화 데이터를 검색하고 관리할 수 있는 영화 추천 및 관리 웹 애플리케이션입니다. TMDB API를 사용하여 최신 영화 데이터를 제공합니다. 또한 카카오 로그인을 통해 보안성을 늘렸습니다.
![스크린샷 2024-12-23 오후 4 09 49](https://github.com/user-attachments/assets/0616c821-9ff6-4fcc-9a2a-4b737776aa79)


---

## 📚 **기술 스택**
- **프론트엔드**: Vue.js 3, TypeScript, TailwindCSS
- **API**: TMDB API (The Movie Database)
- **상태 관리**: 로컬 스토리지
- **빌드 도구**: Vite

---

## 🚀 **설치 및 실행 가이드**

### **1. 프로젝트 복제**
```bash
git clone <repository-url>
cd wsd_front
```

### **2. 종속성 설치**
```bash
npm install
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome
npm install toastify-js
npm install axios
npm install vue-router
npm install vuex
npm install @tailwindcss/forms
npm install dotenv
npm install cross-env --save-dev
```

### **3. 개발 서버 실행**
```bash
npm run serve
```

### **4. 배포용 빌드**
```bash
npm run build
```

### **5. 코드 린트**
```bash
npm run lint
```

## 🛠️ **프로젝트 구조**
wsd_front   
├── dist/                    # 빌드된 배포 파일   
├── node_modules/            # 설치된 npm 패키지<br>
├── public/                  # 정적 파일<br>
│   ├── img.png              # 웹사이트 아이콘<br>
├── src/                     # 소스 코드<br>
│   ├── assets/              # 정적 리소스<br>
│   │   ├── logo.png         # 프로젝트 로고<br>
│   │   └── tailwind.css     # Tailwind CSS 파일<br>
│   ├── components/          # Vue 컴포넌트<br>
│   │   ├── AppBanner.vue    # 배너 컴포넌트<br>
│   │   ├── AppHeader.vue    # 헤더 컴포넌트<br>
│   │   ├── GlobalLoader.vue # 로딩 상태 컴포넌트<br>
│   │   ├── HomePage.vue     # 홈 화면 컴포넌트<br>
│   │   ├── LoginSignUp.vue  # 로그인 및 회원가입 컴포넌트<br>
│   │   ├── MovieList.vue    # 영화 리스트 컴포넌트<br>
│   │   ├── MovieSlider.vue  # 영화 슬라이더 컴포넌트<br>
│   │   ├── PopularPage.vue  # 인기 영화 페이지<br>
│   │   ├── SearchPage.vue   # 영화 검색 페이지<br>
│   │   └── WishList.vue     # 찜 목록 페이지<br>
│   ├── router/              # Vue Router 설정<br>
│   │   └── index.ts         # 라우터 정의<br>
│   ├── services/            # TMDB API 통신<br>
│   │   └── tmdbService.ts   # TMDB API 요청 메서드<br>
│   ├── App.vue              # 앱 진입점<br>
│   ├── main.ts              # Vue 초기화 파일<br>
│   └── shims-vue.d.ts       # Vue 파일 타입 정의<br>
├── .browserslistrc          # 브라우저 지원 설정<br>
├── .eslintrc.js             # ESLint 설정<br>
├── babel.config.js          # Babel 설정<br>
├── package.json             # 프로젝트 메타데이터 및 스크립트<br>
├── postcss.config.js        # PostCSS 설정<br>
├── README.md                # 프로젝트 문서<br>
├── tailwind.config.js       # Tailwind CSS 설정<br>
├── tsconfig.json            # TypeScript 설정<br>
└── vue.config.js            # Vue CLI 설정<br>


