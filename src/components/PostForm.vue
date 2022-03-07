// Создает новый пост на основании данных введённых пользователем. Созданный пост передает наверх.
<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
      v-focus
      v-model="post.title"
      class="form__input"
      placeholder="Название"
    />
    <my-input v-model="post.body" class="form__input" placeholder="Описание" />
    <my-button @click="createPost" class="form__btn">Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      // создаем событие, что бы передать данные родителю, и передаем туда новый пост
      this.$emit("create", this.post);
      // обнуляем строку ввода в инпутах
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
}

.form__btn {
  margin-top: 15px;
  align-self: flex-end;
}

.form__input {
  margin-top: 15px;
}
</style>
