import Vue from 'vue'
export default Vue.extend({
 name: 'FormPages',
 props: ['pages'],
 data() {
  return {
   currentPageIndex: 0,
  }
 },
 computed: {
  currentPage() {
   return {}
  },
 },
})
