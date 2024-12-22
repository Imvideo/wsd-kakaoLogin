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
        alert("인증 코드가 없습니다. 다시 시도해주세요.");
        return router.push("/signin");
      }

      try {
        const response = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            null,
            {
              params: {
                grant_type: "authorization_code",
                client_id: process.env.VUE_APP_KAKAO_API_KEY,
                redirect_uri: process.env.VUE_APP_LOGIN_REDIRECT_URI,
                code,
              },
            }
        );

        const { access_token } = response.data;

        // 사용자 정보 요청
        const userInfoResponse = await axios.get(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );

        const userInfo = userInfoResponse.data.kakao_account.profile;

        // 사용자 정보 저장
        localStorage.setItem("kakaoAccessToken", access_token);
        localStorage.setItem(
            "userInfo",
            JSON.stringify({
              nickname: userInfo.nickname,
              profile_image: userInfo.profile_image_url,
            })
        );

        // 브라우저 스토리지 이벤트 트리거
        window.dispatchEvent(new Event("storage"));

        router.push("/");
      } catch (error) {
        console.error("Kakao Callback Error:", error);
        alert("카카오 로그인 처리 중 오류가 발생했습니다.");
        router.push("/signin");
      }
    });
  },
});
</script>
