import Vue from 'vue';
import Page from './Page.vue';

export default Vue.extend({
  name: 'Pages',
  data() {
    return {
      currentPageIndex: 0,
    };
  },
  components: {
    page: Page,
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
    hasPrevious() {
      return this.$data.currentPageIndex !== 0;
    },
  },
  methods: {
    onNext(): void {
      this.$store
        .dispatch('forms/continueToNextPage', this.$data.currentPageIndex)
        .then(() => {
          this.$data.currentPageIndex++;
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    },
    onPrevious(): void {
      this.$data.currentPageIndex--;
    },
    onElementUpdated(index: number, value: string): void {
      this.$emit('elementUpdated', this.$data.currentPageIndex, index, value);
    },
    onSubmit(): void {
      this.$store
        .dispatch('forms/submitForm')
        .then(() => {
          this.$bvToast.toast('Form submitted successfully', {
            variant: 'success',
            solid: false,
            appendToast: true,
            noCloseButton: true,
          });
        })
        .catch(() => {
          this.$bvToast.toast(
            'Error: there was an issue with form submission',
            {
              variant: 'danger',
              solid: false,
              appendToast: true,
              noCloseButton: true,
            }
          );
        });
    },
  },
});
