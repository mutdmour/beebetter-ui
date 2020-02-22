import Vue from 'vue'
import Page from './Page.vue'

export default Vue.extend({
 name: 'Pages',
 data() {
  return {
   currentPageIndex: 0,
  }
 },
 components: {
  page: Page,
 },
 computed: {
  currentPage() {
   return this.$attrs.pages && this.$attrs.pages[this.$data.currentPageIndex]
  },
  isFinal() {
   return (
    this.$attrs.pages &&
    this.$attrs.pages.length - 1 === this.$data.currentPageIndex
   )
  },
  hasPrevious() {
   return this.$data.currentPageIndex !== 0
  },
 },
 methods: {
  onNext(): void {
   this.$data.currentPageIndex++
  },
  onPrevious(): void {
   this.$data.currentPageIndex--
  },
  onElementUpdated(index: number, value: string): void {
   this.$emit('elementUpdated', this.$data.currentPageIndex, index, value)
  },
  onSubmit(): void {
   alert('success')
  },
 },
})
