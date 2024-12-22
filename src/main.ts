import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css"; // Tailwind CSS 연결

// FontAwesome 관련 임포트
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFilm, faUserCircle, faThLarge, faArrowsAltV, faArrowUp } from "@fortawesome/free-solid-svg-icons";

// FontAwesome 라이브러리에 아이콘 추가
library.add(faFilm, faUserCircle, faThLarge, faArrowsAltV, faArrowUp);

// Vue 애플리케이션 생성
const app = createApp(App);

// 환경 변수
const TMDB_API_KEY = process.env.VUE_APP_TMDB_API_KEY;
const KAKAO_API_KEY = process.env.VUE_APP_KAKAO_API_KEY;
const LOGIN_REDIRECT_URI = process.env.VUE_APP_LOGIN_REDIRECT_URI;

// 환경 변수 출력(테스트용, 필요 없으면 삭제)
console.log("TMDB_API_KEY:", TMDB_API_KEY);
console.log("KAKAO_API_KEY:", KAKAO_API_KEY);
console.log("LOGIN_REDIRECT_URI:", LOGIN_REDIRECT_URI);

// FontAwesome 아이콘을 글로벌 컴포넌트로 등록
app.component("font-awesome-icon", FontAwesomeIcon);

// 라우터 연결
app.use(router);

// 앱 마운트
app.mount("#app");
