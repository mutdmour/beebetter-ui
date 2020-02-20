import Vue from 'vue'
import FormElement from './elements/FormElement.vue'

export default Vue.extend({
 name: 'Page',
 components: {
  'form-element': FormElement,
 },
 computed: {
  elements() {
   return this.$attrs.page && this.$attrs.page.elements
  },
 },
})
