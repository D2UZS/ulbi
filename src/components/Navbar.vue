<template>
  <div class="navbar">
    <div @click="$router.push('/')"><strong>Лого</strong></div>
    <div class="navbar__btns">
      <my-button class="navbar__btn" @click="$router.push('/posts')"
        >Посты</my-button
      >
      <my-button class="navbar__btn" @click="$router.push('/about')"
        >О нас</my-button
      >
      <my-button class="navbar__btn" @click="$router.push('/store')"
        >Store</my-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
.navbar__btn {
  margin-left: 15px;
}
</style>