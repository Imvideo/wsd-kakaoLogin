import { createRouter, createWebHistory } from "vue-router";
import LoginSignUp from "@/components/LoginSignUp.vue";
import HomePage from "@/components/HomePage.vue";
import PopularPage from "@/components/PopularPage.vue";
import SearchPage from "@/components/SearchPage.vue";
import WishList from "@/components/WishList.vue";
import KakaoCallback from "@/components/KakaoCallback.vue";

const routes = [
    {
        path: "/signin", // 로그인 페이지
        name: "SignIn",
        component: LoginSignUp,
    },
    {
        path: "/", // 홈 페이지
        name: "HomePage",
        component: HomePage,
        meta: { requiresAuth: true }, // 인증이 필요한 페이지
    },
    {
        path: "/popular", // 인기 페이지
        name: "PopularPage",
        component: PopularPage,
        meta: { requiresAuth: true }, // 인증 필요
    },
    {
        path: "/search", // 검색 페이지
        name: "SearchPage",
        component: SearchPage,
        meta: { requiresAuth: true }, // 인증 필요
    },
    {
        path: "/wishlist", // 찜 목록 페이지
        name: "WishList",
        component: WishList,
        meta: { requiresAuth: true }, // 인증 필요
    },
    {
        path: "/login/callback", // 카카오 인증 콜백
        name: "KakaoCallback",
        component: KakaoCallback,
    },
    {
        path: "/:pathMatch(.*)*", // 잘못된 경로 처리
        redirect: "/signin",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 인증 여부를 확인하는 글로벌 가드 설정
router.beforeEach((to, from, next) => {
    const kakaoAccessToken = localStorage.getItem("kakaoAccessToken"); // 카카오 액세스 토큰 확인

    // 인증이 필요한 페이지에 접근 시 토큰이 없으면 로그인 페이지로 리다이렉트
    if (to.meta.requiresAuth && !kakaoAccessToken) {
        next("/signin");
    }
    // 이미 로그인된 상태에서 로그인 페이지로 접근하면 홈 페이지로 리다이렉트
    else if (to.path === "/signin" && kakaoAccessToken) {
        next("/");
    }
    // 나머지 경로는 그대로 진행
    else {
        next();
    }
});

export default router;
