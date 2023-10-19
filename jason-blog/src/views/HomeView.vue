<template>
  <el-container style="height: 100%">
    <el-header>
      <el-radio-group style="margin-bottom: 30px">
        <el-radio-button
          v-for="book in books"
          :key="book.index"
          :label="book.index"
          @change="selectBook(book.index)"
          >{{ book.name }}</el-radio-button
        >
      </el-radio-group>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-tabs
          tab-position="left"
          class="demo-tabs"
          @tab-click="selectChapter"
        >
          <el-tab-pane
            v-for="chapter in selectedChapters"
            :key="chapter.index"
            :label="chapter.name"
          >
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main>
        <div class="pdf">
          <PDFView :pdfUrl="selectedChapterUrl" v-show="isPdf" />
        </div>
        <div class="html" v-show="!isPdf" style="width: 100%; height: 100%">
          <iframe
            :src="selectedChapterUrl"
            style="width: 100%; height: 100%"
          ></iframe>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, reactive, onBeforeUpdate } from "vue";
import PDFView from "../components/pdfPreview.vue";

//打印导入的pdf路径格式
const booksDirectoryRoot = process.env["VUE_APP_BASE_URL"] + "/files";
const isPdf: boolean = getUrlValue("mode") == "pdf";
console.log("isPdf:" + isPdf);
const pdfFiles = require.context("/public/files", true, /\.pdf$/);
const htmlFiles = require.context("/public/files", true, /\.html$/);
const booksDirectory = isPdf ? pdfFiles : htmlFiles;
interface chapter {
  index: number;
  name: string;
  bookUrl: string;
}

interface book {
  index: number;
  name: string;
  chapters: chapter[];
}

const books: book[] = [];

const deleteAll = (selectedChapters: chapter[]) => {
  selectedChapters = selectedChapters.splice(0, selectedChapters.length);
};

const addAll = (selectedChapters: chapter[], chapters: chapter[]) => {
  chapters.forEach((chapter) => selectedChapters.push(chapter));
};

const selectBook = (index: number) => {
  const selectingBook = books.at(index);
  if (selectingBook == undefined) {
    throw new Error("Unexpected error: Missing selectedChapter");
  }
  selectedBook.value = selectingBook;
  selectedChapters.value = selectingBook.chapters;
  selectChapterFromIndex(0);
};

const selectChapter = (tab, event) => {
  const id: string[] = event.target.getAttribute("id").split("-");
  if (id.at(1) == undefined) {
    throw new Error("Unexpected error: Missing tableId");
  }
  const index = Number(id.at(1));
  selectChapterFromIndex(index);
};

const selectChapterFromIndex = (index: number) => {
  const selectingChapter = selectedChapters.value.at(index);
  if (selectingChapter != undefined) {
    selectedChapterUrl.value = selectingChapter.bookUrl;
  }
};

function emptyBookName() {
  return "";
}

function getBook(directoryArray: string[], bookDirectory: string) {
  let bookName: string;
  bookName = directoryArray.at(1) ?? emptyBookName();
  let chapter: string | undefined = directoryArray.at(
    directoryArray.length - 1
  );
  chapter = chapter?.split(".").at(0);
  const bookUrl: string = booksDirectoryRoot + bookDirectory.substring(1);
  return { bookName, chapter, bookUrl };
}

const init = () => {
  booksDirectory.keys().forEach((bookDirectory) => {
    let directoryArray: string[] = bookDirectory.split("/");
    let { bookName, chapter, bookUrl } = getBook(directoryArray, bookDirectory);

    if (bookName == emptyBookName()) {
      return;
    }
    let bookIndex: number = books.findIndex((book) => bookName == book.name);
    if (bookIndex == -1) {
      books.push({
        index: books.length,
        name: bookName,
        chapters: chapter
          ? [{ index: 0, name: chapter, bookUrl: bookUrl }]
          : [],
      });
    } else {
      let book = books.at(bookIndex);
      if (book != undefined && chapter != undefined) {
        let chapters = book.chapters;
        chapters.push({
          index: chapters.length,
          name: chapter,
          bookUrl: bookUrl,
        });
      }
    }
  });
};

function getUrlValue(key: string) {
  var url = window.location.href; //获取当前url
  var dz_url = url.split("#")[0]; //获取#/之前的字符串
  var cs_url = dz_url.split("?")[1]; //获取?之后的参数字符串
  if (cs_url == undefined) {
    return undefined;
  }
  var cs_arr = cs_url.split("&"); //参数字符串分割为数组
  var cs = {};
  for (var i = 0; i < cs_arr.length; i++) {
    //遍历数组，拿到json对象
    cs[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
  }
  return cs[key];
}

init();
const selectedBook = ref();
const selectedChapters = ref();
const selectedChapterUrl = ref("");

const book1 = books.at(0);
if (book1 != undefined) {
  selectedBook.value = book1;
  selectedChapters.value = selectedBook.value.chapters;
  const book1chapter1 = selectedChapters.value.at(0);
  if (book1chapter1 != undefined) {
    selectedChapterUrl.value =
      process.env["VUE_APP_BASE_URL"] + book1chapter1.bookUrl;
  } else {
    throw new Error("Unexpected error: Missing selectedChapter");
  }
} else {
  throw new Error("Unexpected error: Missing selectedBook");
}
</script>
<style>
.el-main {
  padding: 0px !important;
}
</style>
