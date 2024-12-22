<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800 relative">
    <!-- 배경 -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://via.placeholder.com/1920x1080'); filter: blur(8px);"
    ></div>

    <!-- 로그인 카드 -->
    <div class="relative w-full max-w-md flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign in with Kakao</h2>
      <button
          @click="handleKakaoLogin"
          class="w-full py-2 px-4 bg-yellow-400 text-black font-semibold rounded-md shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        카카오 로그인
      </button>
      <div v-if="errorMessage" class="text-red-500 text-center mt-4">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginSignUp",
  setup() {
    const errorMessage = ref("");

    // 카카오 로그인 처리
    const handleKakaoLogin = () => {
      try {
        // 카카오 로그인 URL
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.VUE_APP_KAKAO_API_KEY}&redirect_uri=${process.env.VUE_APP_LOGIN_REDIRECT_URI}`;

        // 사용자에게 카카오 인증 요청
        window.location.href = KAKAO_AUTH_URL;
      } catch (error) {
        console.error("Kakao Login Error:", error);
        errorMessage.value = "카카오 로그인 중 오류가 발생했습니다.";
      }
    };

    return {
      handleKakaoLogin,
      errorMessage,
    };
  },
});
</script>

<style scoped>
.min-h-screen {
  height: 100vh;
}
</style>
