export default {
    template: "#search-form",
    // parent -> child
    props: ["value"],
    data() {
        return {
            inputValue: this.value,
        };
    },
    watch: {
        value(newVal, oldVal) {
            this.inputValue = newVal;
        },
    },
    methods: {
        onSubmit() {
            // $emit : child -> parent
            this.$emit("@submit", this.inputValue.trim());
        },
        onKeyup() {
            if (!this.inputValue.length) this.onReset();
        },
        onReset() {
            this.inputValue = "";
            this.$emit("@reset");
        },
    },
};
