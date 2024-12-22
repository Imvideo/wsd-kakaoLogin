<template>
  <header class="bg-black text-white flex items-center justify-between px-4 py-2">
    <!-- 로고 -->
    <div class="flex items-center cursor-pointer" @click="redirectToHome">
      <font-awesome-icon icon="film" class="text-red-500 h-6 w-6 mr-2" />
    </div>

    <!-- 네비게이션 -->
    <nav class="flex space-x-4">
      <router-link to="/" class="hover:underline">홈</router-link>
      <router-link to="/popular" class="hover:underline">대세 콘텐츠</router-link>
      <router-link to="/search" class="hover:underline">찾아보기</router-link>
      <router-link to="/wishlist" class="hover:underline">내가 찜한 리스트</router-link>
    </nav>

    <!-- 유저 정보 -->
    <div class="flex items-center space-x-4">
      <!-- 닉네임 -->
      <span v-if="userInfo" class="text-sm">{{ userInfo.nickname }}</span>

      <!-- 프로필 사진 -->
      <img
          v-if="userInfo && userInfo.profile_image"
          :src="userInfo.profile_image"
          alt="Profile"
          class="h-8 w-8 rounded-full cursor-pointer"
          @click="handleLogout"
      />

      <!-- 기본 아이콘 -->
      <font-awesome-icon
          v-else
          icon="user-circle"
          class="h-8 w-8 cursor-pointer"
          @click="handleLogout"
      />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const router = useRouter();
    const userInfo = ref<{ nickname: string; profile_image: string } | null>(null);

    const loadUserInfo = () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        userInfo.value = JSON.parse(storedUserInfo);
      } else {
        userInfo.value = null;
      }
    };

    // 로그아웃 처리
    const handleLogout = () => {
      localStorage.clear();
      userInfo.value = null; // 상태 초기화
      router.push("/signin");
    };

    // 사용자 정보 동기화
    window.addEventListener("storage", () => {
      loadUserInfo();
    });

    onMounted(() => {
      loadUserInfo();
    });

    return { redirectToHome: () => router.push("/"), handleLogout, userInfo };
  },
});
</script>

<style scoped>
/* 헤더 스타일 */
header {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
