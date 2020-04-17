import Vue from "vue";
import Page from "./Page.vue";
import DatePicker from "./elements/DatePicker.vue";

export default Vue.extend({
  name: "Pages",
  props: ["canSubmit", "date"],
  data() {
    return {
      currentPageIndex: 0
    };
  },
  components: {
    page: Page,
    "date-picker": DatePicker
  },
  computed: {
    currentPage() {
      return (
        this.$attrs.pages && this.$attrs.pages[this.$data.currentPageIndex]
      );
    },
    isFinal() {
      return (
        this.$attrs.pages &&
        this.$attrs.pages.length - 1 === this.$data.currentPageIndex
      );
    },
    isFirst() {
      return this.$data.currentPageIndex === 0;
    },
    hasPrevious() {
      return this.$data.currentPageIndex !== 0;
    }
  },
  methods: {
    onNext(): void {
      this.$store
        .dispatch("forms/continueToNextPage", this.$data.currentPageIndex)
        .then(() => {
          this.$data.currentPageIndex++;
        })
        .catch(e => {
          this.$bvToast.toast(`${e}`, {
            variant: "danger",
            solid: false,
            appendToast: true,
            noCloseButton: true
          });
        });
    },
    onPrevious(): void {
      this.$data.currentPageIndex--;
    },
    onElementUpdated(index: number, value: string): void {
      this.$emit("elementUpdated", this.$data.currentPageIndex, index, value);
    },
    onDateUpdated(value: string) {
      this.$emit("dateUpdated", value);
    },
    onSubmit(): void {
      this.$store
        .dispatch("forms/submit")
        .then(() => {
          this.$bvToast.toast("Form submitted successfully", {
            variant: "success",
            solid: false,
            appendToast: true,
            noCloseButton: true
          });
          this.$router.push("/forms");
        })
        .catch(e => {
          this.$bvToast.toast(`${e}`, {
            variant: "danger",
            solid: false,
            appendToast: true,
            noCloseButton: true
          });
        });
    }
  }
});
