<template>
  <el-container>
    <el-main height="100%">
      <div class="pdf-preview">
        <vue-pdf-embed
          :source="state.source"
          :style="scaleFun"
          class="vue-pdf-embed"
          :page="state.pageNum"
        />
      </div>
      <el-row justify="center">
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="state.pageNum"
            :page-size="1"
            :small="small"
            :disabled="false"
            :background="true"
            layout="prev, pager, next"
            :total="state.numPages"
            :key="isUpdateChild"
          />
        </div>
      </el-row>
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</template>
<script setup lang="ts">
import { reactive, onMounted, computed, watch, ref } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/esm";
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
});

const state = reactive({
  source: props.pdfUrl, //预览pdf文件地址
  pageNum: 1, //当前页面
  scale: 1, // 缩放比例
  numPages: 0, // 总页数
});
let isUpdateChild = ref(true);

watch(
  () => props.pdfUrl,
  (newVal, oldVal) => {
    state.source = newVal;
    isUpdateChild.value = !isUpdateChild.value;
    console.log("new", newVal);
    console.log("old", oldVal);
  }
);

onMounted(() => {
  const loadingTask = createLoadingTask(state.source);
  loadingTask.promise.then((pdf: { numPages: number }) => {
    state.numPages = pdf.numPages;
  });
  console.log(props.pdfUrl);
});

const scale = computed(() => `transform:scale(${state.scale})`);
</script>
<style>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
