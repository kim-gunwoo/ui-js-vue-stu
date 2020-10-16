<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form
        v-bind:value="query"
        v-on:@submit="onSubmit"
        v-on:@reset="onReset"
      ></search-form>

      <div class="content">
        <div v-if="submitted">
          <search-result
            v-bind:data="searchResult"
            v-bind:query="query"
          ></search-result>
        </div>
        <div v-else>
          <tab-component
            v-bind:tabs="tabs"
            v-bind:selected-tab="selectedTab"
            v-on:@change="onClickTab"
          ></tab-component>

          <div v-if="selectedTab === tabs[0]">
            <list-component
              v-bind:data="keywords"
              type="keywords"
              v-on:@click="onClickKeyword"
            ></list-component>
          </div>
          <div v-else>
            <list-component
              v-bind:data="history"
              type="history"
              v-on:@click="onClickKeyword"
              v-on:@remove="onClickRemoveHistory"
            ></list-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchModel from "./models/SearchModel.js";
import KeywordModel from "./models/KeywordModel.js";
import HistoryModel from "./models/HistoryModel.js";

import FormComponent from "./components/FormComponent";
import ListComponent from "./components/ListComponent";
import ResultComponent from "./components/ResultComponent";
import TabComponent from "./components/TabComponent";

export default {
  name: "app",
  components: { FormComponent, ListComponent, ResultComponent, TabComponent },
  data() {
    return {
      query: "",
      submitted: false,
      tabs: ["추천 검색어", "최근 검색어"],
      selectedTab: "",
      keywords: [],
      history: [],
      searchResult: []
    };
  },
  components: {
    "search-form": FormComponent,
    "search-result": ResultComponent,
    "list-component": ListComponent,
    "tab-component": TabComponent
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchKeyword();
    this.fetchHistory();
  },
  methods: {
    onSubmit(query) {
      this.query = query;
      this.search();
    },
    onReset(e) {
      this.resetForm();
    },
    onClickTab(tab) {
      this.selectedTab = tab;
    },
    onClickKeyword(keyword) {
      this.query = keyword;
      this.search();
    },
    onClickRemoveHistory(keyword) {
      HistoryModel.remove(keyword);
      this.fetchHistory();
    },
    fetchKeyword() {
      KeywordModel.list().then(data => {
        this.keywords = data;
      });
    },
    fetchHistory() {
      HistoryModel.list().then(data => {
        this.history = data;
      });
    },
    search() {
      SearchModel.list().then(data => {
        this.submitted = true;
        this.searchResult = data;
      });
      HistoryModel.add(this.query);
      this.fetchHistory();
    },
    resetForm() {
      this.query = "";
      this.submitted = false;
      this.searchResult = [];
    }
  }
};
</script>

<style></style>
