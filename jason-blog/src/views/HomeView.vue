<template>
  <el-container>
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
      <el-aside width="25%">
        <el-tabs
          tab-position="left"
          class="demo-tabs"
          @tab-click="selectChapter"
        >
          <el-tab-pane
            v-for="chapter in selectedChapters.chapters"
            :key="chapter.index"
            :label="chapter.name"
          >
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main width="75%">
        <div class="pdf">
          <PDFView :pdfUrl="selectedChapter.chapter.pdfUrl" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, reactive, onBeforeUpdate } from "vue";
import PDFView from "../components/pdfPreview.vue";
import jsPdf from "../../../files/LinearAlgebra/pdf/线性代数中的线性方程组.pdf";
import { createDecorator, setup } from "vue-class-component";

//, /\.vue$/

//打印导入的pdf路径格式
console.log(jsPdf);
const booksDirectoryRoot = "_/files";
const booksDirectory = require.context("../../../files", true, /\.pdf$/);
interface chapter {
  index: number;
  name: string;
  pdfUrl: string;
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
  selectedBook.book = selectingBook;
  selectedChapters.chapters = selectingBook.chapters;
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
  const selectingChapter = selectedChapters.chapters.at(index);
  if (selectingChapter != undefined) {
    selectedChapter.chapter = selectingChapter;
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
  const pdfUrl: string = booksDirectoryRoot + bookDirectory.substring(1);
  return { bookName, chapter, pdfUrl };
}

const init = () => {
  booksDirectory.keys().forEach((bookDirectory) => {
    let directoryArray: string[] = bookDirectory.split("/");
    let { bookName, chapter, pdfUrl } = getBook(directoryArray, bookDirectory);

    if (bookName == emptyBookName()) {
      return;
    }
    let bookIndex: number = books.findIndex((book) => bookName == book.name);
    if (bookIndex == -1) {
      books.push({
        index: books.length,
        name: bookName,
        chapters: chapter ? [{ index: 0, name: chapter, pdfUrl: pdfUrl }] : [],
      });
    } else {
      let book = books.at(bookIndex);
      if (book != undefined && chapter != undefined) {
        let chapters = book.chapters;
        chapters.push({
          index: chapters.length,
          name: chapter,
          pdfUrl: pdfUrl,
        });
      }
    }
  });
};

init();

let selectedBook: { book: book };
let selectedChapters: { chapters: chapter[] };
let selectedChapter: { chapter: chapter };
let selectedChapterIndex = 0;

const book1 = books.at(0);
if (book1 != undefined) {
  selectedBook = reactive({ book: book1 });
  selectedChapters = reactive({ chapters: selectedBook.book.chapters });
  const book1chapter1 = selectedChapters.chapters.at(0);
  if (book1chapter1 != undefined) {
    selectedChapter = reactive({ chapter: book1chapter1 });
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
