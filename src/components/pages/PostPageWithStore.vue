// Хранит массив с объектами постов. Получает новый пост от компонента PostForm и добавляет в массив с постами. Передает массив с постами в компонент PostList.
<template>
  <div>
    <h1>Страница с постами</h1>
    <!-- <my-input
      v-focus
      class="app__search"
      v-model="searchQuery"
      placeholder="Поиск..."
    /> -->
    <div class="app__btns">
      <my-button class="app__btn" @click="showDialog">Создать пост</my-button>
      <!-- <my-select v-model="selectedSort" :options="sortOptions" /> -->
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="pagination">
      <div
        class="pagination__item"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{ 'pagination__item--current': page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "posts/setPage",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    createPost(post) {
      // Получаем новый пост и добавляем его в массив с постами
      this.posts.push(post);
      // Закрываем модальное окно
      this.dialogVisible = false;
    },
    removePost(post) {
      // Фильтруем массив с постами(удаляя нужный), и перезаписываем массив с постами
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
  watch: {
    // Нужна для пагинации
    // page() {
    //   this.fetchPosts();
    // },
  },
};
</script>

<style scoped>
.app__search {
  margin-top: 15px;
}

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.pagination {
  display: flex;
  margin-top: 15px;
}
.pagination__item {
  border: 1px solid black;
  padding: 10px;
}
.pagination__item--current {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background-color: red;
}
</style>
