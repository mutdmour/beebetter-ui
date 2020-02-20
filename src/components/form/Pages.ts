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
   return this.$attrs.value && this.$attrs.value[this.$data.currentPageIndex]
  },
  isFinal() {
   return (
    this.$attrs.value &&
    this.$attrs.value.length - 1 === this.$data.currentPageIndex
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
  onSubmit() {
   alert('success')
  },
 },
})
