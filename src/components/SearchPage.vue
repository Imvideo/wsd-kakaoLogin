<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Filters Section -->
    <div class="p-4 flex flex-wrap gap-4 items-center">
      <label>
        <span class="block mb-1">장르</span>
        <select
            v-model="selectedGenre"
            class="px-4 py-2 rounded bg-gray-800 text-white"
        >
          <option value="">전체</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </label>

      <label>
        <span class="block mb-1">평점</span>
        <select
            v-model="selectedRating"
            class="px-4 py-2 rounded bg-gray-800 text-white"
        >
          <option value="">전체</option>
          <option value="8">8점 이상</option>
          <option value="7">7점 이상</option>
          <option value="6">6점 이상</option>
        </select>
      </label>

      <label>
        <span class="block mb-1">정렬</span>
        <select
            v-model="selectedSort"
            class="px-4 py-2 rounded bg-gray-800 text-white"
        >
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">최신순</option>
          <option value="vote_average.desc">평점순</option>
        </select>
      </label>

      <button
          @click="resetFilters"
          class="px-4 py-2 bg-red-500 text-white rounded"
      >
        초기화
      </button>
    </div>

    <!-- Movies Section -->
    <div class="p-4">
      <div v-if="loading" class="text-center text-lg">Loading...</div>
      <div v-else>
        <div class="grid grid-cols-4 gap-4">
          <div
              v-for="movie in movies"
              :key="movie.id"
              class="relative bg-gray-800 rounded overflow-hidden shadow-lg cursor-pointer"
              @click="toggleWishlist(movie)"
          >
            <img
                :src="getImageUrl(movie.poster_path)"
                alt="Poster"
                class="w-full h-64 object-cover"
            />
            <div class="p-2">
              <h3 class="text-lg font-bold truncate">{{ movie.title }}</h3>
              <p class="text-sm text-gray-400">평점: {{ movie.vote_average }}</p>
            </div>
            <!-- 찜 상태 표시 -->
            <span
                v-if="movie.isWishlist"
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
            이전
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-gray-700 rounded-md ml-2 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import { fetchGenres, fetchFilteredMovies } from "@/services/tmdbService";

export default defineComponent({
  name: "SearchPage",
  setup() {
    const apiKey = ref(process.env.VUE_APP_TMDB_API_KEY);
    const movies = ref<any[]>([]);
    const genres = ref<any[]>([]);
    const loading = ref(false);

    const selectedGenre = ref("");
    const selectedRating = ref("");
    const selectedSort = ref("popularity.desc");

    const currentPage = ref(1);
    const totalPages = ref(1);

    if (!apiKey.value) {
      alert("TMDB API key is missing. Please log in again.");
      window.location.href = "/signin";
    }

    const getImageUrl = (path: string) =>
        path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder.jpg";

    const loadWishlistStatus = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      movies.value = movies.value.map((movie) => ({
        ...movie,
        isWishlist: wishlist.some((item: any) => item.id === movie.id),
      }));
    };

    const toggleWishlist = (movie: any) => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      if (movie.isWishlist) {
        const updatedWishlist = wishlist.filter((item: any) => item.id !== movie.id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      } else {
        wishlist.push({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }

      loadWishlistStatus();
    };

    const loadMovies = async () => {
      loading.value = true;
      try {
        const response = await fetchFilteredMovies({
          apiKey: apiKey.value,
          page: currentPage.value,
          genre: selectedGenre.value,
          rating: selectedRating.value,
          sort: selectedSort.value,
        });
        movies.value = response.results.map((movie: any) => ({
          ...movie,
          isWishlist: false,
        }));
        loadWishlistStatus();
        totalPages.value = response.total_pages;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        loading.value = false;
      }
    };

    const loadGenres = async () => {
      try {
        const response = await fetchGenres(apiKey.value);
        genres.value = response.genres;
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const resetFilters = () => {
      selectedGenre.value = "";
      selectedRating.value = "";
      selectedSort.value = "popularity.desc";
      currentPage.value = 1;
      loadMovies();
    };

    const changePage = (page: number) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
        loadMovies();
      }
    };

    watch(
        [selectedGenre, selectedRating, selectedSort],
        () => {
          currentPage.value = 1;
          loadMovies();
        },
        { immediate: true }
    );

    onMounted(() => {
      loadMovies();
      loadGenres();
    });

    return {
      movies,
      genres,
      loading,
      selectedGenre,
      selectedRating,
      selectedSort,
      currentPage,
      totalPages,
      resetFilters,
      changePage,
      getImageUrl,
      toggleWishlist,
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
