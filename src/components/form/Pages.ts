import Vue from "vue";
import Page from "./Page.vue";
import DatePicker from "./elements/DatePicker.vue";
import { ElementUpdateEvent } from "../../index";

export default Vue.extend({
  name: "Pages",
  props: ["canSubmit", "date", "showDatePicker", "pages"],
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
        this.$props.pages && this.$props.pages[this.$data.currentPageIndex]
      );
    },
    isFinal(): boolean {
      return Boolean(
        this.$props.pages &&
          this.$props.pages.length - 1 === this.$data.currentPageIndex
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
    onElementUpdated(index: number, event: ElementUpdateEvent): void {
      this.$emit("elementUpdated", this.$data.currentPageIndex, index, event);
      if (!this.$props.canSubmit) {
        const page = this.$props.pages[this.$data.currentPageIndex];
        const element = page.elements[index];
        this.$store
          .dispatch("forms/submitElement", element.id)
          .then(() => {
            this.$bvToast.toast(`${element.id} updated: ${event.state}`, {
              variant: "success",
              solid: false,
              appendToast: true,
              noCloseButton: true
            });
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
    },
    onDateUpdated(value: string) {
      this.$emit("dateUpdated", value);
    },
    onSubmit(): void {
      this.$store
        .dispatch("forms/submit")
        .then(() => {
          this.$bvModal
            .msgBoxOk("Form was submitted successfully", {
              size: "sm",
              buttonSize: "sm",
              okVariant: "success",
              headerClass: "p-2 border-bottom-0",
              footerClass: "p-2 border-top-0",
              centered: true
            })
            .then(() => {
              this.$router.push("/forms");
            });
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
