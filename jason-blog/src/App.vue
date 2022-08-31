<template>
  <el-radio-group v-model="selectedBook" style="margin-bottom: 30px">
    <el-radio-button v-for="book in books" :key="book.index" :label="book">{{
      book.name
    }}</el-radio-button>
  </el-radio-group>
  <el-tabs tab-position="left" class="demo-tabs">
    <el-tab-pane
      v-for="chapter in selectedBook.chapters"
      :key="chapter.index"
      :label="chapter.name"
    >
      {{ chapter.name }}
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";

let tabIndex = 2;
const books = ref([
  {
    index: "0",
    name: "Linear Algebra",
    chapters: [
      {
        index: "0",
        name: "线性代数中的线性方程组",
      },
      {
        index: "1",
        name: "矩阵代数",
      },
      {
        index: "1",
        name: "矩阵代数",
      },
    ],
  },
  {
    index: "1",
    name: "Java In Concurrence",
    chapters: [
      {
        index: "0",
        name: "Fundamentals",
      },
      {
        index: "1",
        name: "Fundamentals",
      },
      {
        index: "1",
        name: "Fundamentals",
      },
    ],
  },
]);
const selectedBook = ref(books.value[0]);
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
