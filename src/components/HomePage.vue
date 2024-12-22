<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <AppBanner :apiKey="apiKey" />
    <section class="p-6">
      <MovieSlider :title="'인기 영화'" :fetchType="'popular'" :apiKey="apiKey" />
      <MovieSlider :title="'최신 영화'" :fetchType="'now_playing'" :apiKey="apiKey" />
      <MovieSlider :title="'액션 영화'" :fetchType="'discover'" :genreId="28" :apiKey="apiKey" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import AppBanner from "@/components/AppBanner.vue";
import MovieSlider from "@/components/MovieSlider.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    AppBanner,
    MovieSlider,
  },
  setup() {
    const apiKey = ref(process.env.VUE_APP_TMDB_API_KEY);

    onMounted(() => {
      if (!apiKey.value) {
        alert("TMDB API key is missing. Please check your environment variables.");
        window.location.href = "/signin";
      }
    });

    return {
      apiKey,
    };
  },
});
</script>
