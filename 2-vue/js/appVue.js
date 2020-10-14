import SearchModel from "./models/SearchModel.js";
import KeywordModel from "./models/KeywordModel.js";
import HistoryModel from "./models/HistoryModel.js";

new Vue({
    el: "#app",
    data: {
        query: "",
        searchResult: [],
        submitted: false,
        tabs: ["추천 검색어", "최근 검색어"],
        selectedTab: "",
        keywords: [],
        history: [],
    },
    created() {
        this.selectedTab = this.tabs[0];
        this.fetchKeyword();
        this.fetchHistory();
    },
    methods: {
        onSubmit(e) {
            //e.preventDefault();
            this.search();
        },
        onReset() {
            this.resetForm();
        },
        onKeyup() {
            if (!this.query.length) this.resetForm();
        },
        resetForm() {
            this.query = "";
            this.submitted = false;
            this.searchResult = [];
        },
        search() {
            SearchModel.list().then((data) => {
                this.submitted = true;
                this.searchResult = data;
            });
            HistoryModel.add(this.query);
            this.fetchHistory();
        },
        onClickTab(tab) {
            this.selectedTab = tab;
        },
        fetchKeyword() {
            KeywordModel.list().then((data) => {
                this.keywords = data;
            });
        },
        onClickKeyword(keyword) {
            this.query = keyword;
            this.search();
        },
        fetchHistory() {
            HistoryModel.list().then((data) => {
                this.history = data;
            });
        },
        onClickRemoveHistory(keyword) {
            //e.stopPropagation();
            HistoryModel.remove(keyword);
            this.fetchHistory();
        },
    },
});
