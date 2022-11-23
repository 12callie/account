<template>
  <div id="app">
    <router-view />
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
</style>
