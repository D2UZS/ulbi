// Хранит массив с объектами постов. Получает новый пост от компонента PostForm и добавляет в массив с постами. Передает массив с постами в компонент PostList.
<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-focus
      class="app__search"
      v-model="searchQuery"
      placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button class="app__btn" @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
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

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  methods: {
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
    // Нужна для пагинации
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        // setTimeout(async () => {
        //   const response = await axios.get(
        //     "https://jsonplaceholder.typicode.com/posts",
        //     {
        //       params: {
        //         _page: this.page,
        //         _limit: this.limit,
        //       },
        //     }
        //   );
        //   this.totalPages = Math.ceil(
        //     response.headers["x-total-count"] / this.limit
        //   );
        //   this.posts = response.data;
        //   this.isPostsLoading = false;
        // }, 1000);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
        this.isPostsLoading = false;
      } catch (e) {
        alert("Ошибка");
      } finally {
        // Когда уберу setTimeout перенести сюда this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
  mounted() {
    this.fetchPosts();
    //Подгрузка новых постов после скролла - отслеживание за пересечение какого либо элемента
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      // Возвращает отсортированный массив с постами
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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
