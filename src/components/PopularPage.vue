<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- 로딩 화면 -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <p class="text-white text-xl font-bold">Loading...</p>
    </div>

    <!-- Main Content -->
    <div class="p-4" v-else>
      <div class="flex justify-end mb-4 space-x-4">
        <!-- Table View 버튼 -->
        <button
            @click="switchToTableView"
            :class="viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-700'"
            class="px-4 py-2 rounded-md flex items-center"
        >
          <font-awesome-icon icon="th-large" class="text-xl" />
        </button>
        <!-- Infinite Scroll 버튼 -->
        <button
            @click="switchToInfiniteScroll"
            :class="viewMode === 'infinite' ? 'bg-blue-500 text-white' : 'bg-gray-700'"
            class="px-4 py-2 rounded-md flex items-center"
        >
          <font-awesome-icon icon="arrows-alt-v" class="text-xl" />
        </button>
      </div>

      <div v-if="viewMode === 'table'">
        <!-- Table View -->
        <div class="grid grid-cols-4 gap-4">
          <div
              v-for="movie in currentMovies"
              :key="movie.id"
              @click="toggleWishlist(movie)"
              class="relative bg-gray-800 p-2 rounded-md flex flex-col items-center cursor-pointer"
          >
            <img
                :src="getImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="w-full h-48 object-cover rounded-md"
                @error="handleImageError"
            />
            <p class="mt-2 text-center text-sm">{{ movie.title }}</p>
            <!-- 찜한 영화 표시 -->
            <span
                v-if="wishlist.some((item) => item.id === movie.id)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              ❤️
            </span>
          </div>
        </div>
        <!-- Pagination -->
        <div class="flex justify-center items-center mt-4">
          <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-gray-700 rounded-md mr-2 disabled:opacity-50"
          >
            <font-awesome-icon icon="arrow-left" class="mr-1" />
            이전
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-gray-700 rounded-md ml-2 disabled:opacity-50"
          >
            다음
            <font-awesome-icon icon="arrow-right" class="ml-1" />
          </button>
        </div>
      </div>

      <div v-else>
        <!-- Infinite Scroll -->
        <div class="grid grid-cols-4 gap-4">
          <div
              v-for="movie in movies"
              :key="movie.id"
              @click="toggleWishlist(movie)"
              class="relative bg-gray-800 p-2 rounded-md flex flex-col items-center cursor-pointer"
          >
            <img
                :src="getImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="w-full h-48 object-cover rounded-md"
                @error="handleImageError"
            />
            <p class="mt-2 text-center text-sm">{{ movie.title }}</p>
            <!-- 찜한 영화 표시 -->
            <span
                v-if="wishlist.some((item) => item.id === movie.id)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              ❤️
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Button -->
    <button
        @click="scrollToTop"
        class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
    >
      <font-awesome-icon icon="arrow-up" class="mr-2" />
      Top
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from "vue";
import { fetchPopularMovies } from "@/services/tmdbService";

export default defineComponent({
  name: "PopularPage",
  setup() {
    const viewMode = ref("table");
    const movies = ref<any[]>([]);
    const currentMovies = ref<any[]>([]);
    const currentPage = ref(1);
    const totalPages = ref(10);
    const loading = ref(false);

    // Wishlist 상태 관리
    const wishlist = ref<any[]>(JSON.parse(localStorage.getItem("wishlist") || "[]"));

    const apiKey = ref(process.env.VUE_APP_TMDB_API_KEY);

    if (!apiKey.value) {
      alert("TMDB API key is missing. Please check your environment variables.");
      window.location.href = "/signin";
    }

    const getImageUrl = (path: string) =>
        path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder.jpg";

    const handleImageError = (event: Event) => {
      (event.target as HTMLImageElement).src = "/placeholder.jpg";
    };

    const loadMovies = async (page: number) => {
      loading.value = true;
      try {
        const response = await fetchPopularMovies(apiKey.value, page);
        if (viewMode.value === "infinite") {
          movies.value = [...movies.value, ...response];
        } else {
          currentMovies.value = response;
        }
        totalPages.value = 10;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        loading.value = false;
      }
    };

    const toggleWishlist = (movie: any) => {
      const index = wishlist.value.findIndex((item) => item.id === movie.id);
      if (index > -1) {
        wishlist.value.splice(index, 1);
      } else {
        wishlist.value.push(movie);
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist.value));
    };

    const changePage = (page: number) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
        loadMovies(page);
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const switchToTableView = async () => {
      viewMode.value = "table";
      currentPage.value = 1;
      currentMovies.value = [];
      await loadMovies(1);
    };

    const switchToInfiniteScroll = async () => {
      viewMode.value = "infinite";
      currentPage.value = 1;
      movies.value = [];
      await loadMovies(1);
    };

    const handleScroll = () => {
      if (viewMode.value !== "infinite") return;

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading.value) {
        changePage(currentPage.value + 1);
      }
    };

    onMounted(() => {
      loadMovies(currentPage.value);
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      viewMode,
      movies,
      currentMovies,
      currentPage,
      totalPages,
      loading,
      wishlist,
      getImageUrl,
      handleImageError,
      toggleWishlist,
      changePage,
      scrollToTop,
      switchToTableView,
      switchToInfiniteScroll,
    };
  },
});
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
button:hover {
  background-color: #444;
}
</style>
