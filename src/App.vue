<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <router-link to="/">账单</router-link> |
      <router-link to="/money">记一笔</router-link> |
      <router-link to="/statistics">统计</router-link>
    </div>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background-color: rgb(239, 239, 239);
  min-height: 100vh;
  color: #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
}
</style>
