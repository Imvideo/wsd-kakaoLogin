<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800 text-white">
    <p>카카오 로그인 처리 중...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "KakaoCallback",
  setup() {
    const router = useRouter();

    onMounted(async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        console.error("Authorization code is missing.");
        return;
      }

      try {
        // 카카오 토큰 요청
        const response = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            null,
            {
              params: {
                grant_type: "authorization_code",
                client_id: process.env.VUE_APP_KAKAO_API_KEY, // 환경 변수에서 카카오 API 키 가져오기
                redirect_uri: process.env.VUE_APP_LOGIN_REDIRECT_URI, // 환경 변수에서 리다이렉트 URI 가져오기
                code,
              },
            }
        );

        const { access_token } = response.data;

        // 카카오 사용자 정보 요청
        const userInfoResponse = await axios.get(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );

        const userInfo = userInfoResponse.data;

        // 로그인 성공 처리
        localStorage.setItem("kakaoAccessToken", access_token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        router.push("/"); // 홈 화면으로 이동
      } catch (error) {
        console.error("Kakao Callback Error:", error);
      }
    });
  },
});
</script>

<style scoped>
.min-h-screen {
  height: 100vh;
}
</style>
