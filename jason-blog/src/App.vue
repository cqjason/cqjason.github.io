<template>
  <div class="container" id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup></script>
<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
