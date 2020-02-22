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
  onNext() {
   this.$data.currentPageIndex++
  },
  onPrevious() {
   this.$data.currentPageIndex--
  },
  updateValue(index: number, value: string) {
   console.log(index, value)
  },
  onSubmit() {
   alert('success')
  },
 },
})
