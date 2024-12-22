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
        path: "/popular", // 로그인 페이지
        name: "PopularPage",
        component: PopularPage,
    },
    {
        path: "/search", // 로그인 페이지
        name: "SearchPage",
        component: SearchPage,
    },
    {
        path: "/wishlist", // 로그인 페이지
        name: "WishList",
        component: WishList,
    },
    {
        path: "/:pathMatch(.*)*", // 잘못된 경로 처리
        redirect: "/signin",
    },
    {
        path: "/oauth/kakao/callback",
        component: KakaoCallback
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 인증 여부를 확인하는 글로벌 가드 설정
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("apiKey"); // API 키가 로그인 상태로 간주
    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/signin"); // 인증 필요하지만 인증되지 않은 경우
    } else if (to.path === "/signin" && isAuthenticated) {
        next("/"); // 이미 인증된 상태에서 /signin으로 접근하면 홈으로 리디렉션
    } else {
        next(); // 인증이 필요 없거나 인증된 경우
    }
});

export default router;
