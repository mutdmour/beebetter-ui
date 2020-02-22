import Vue from 'vue'
import FormElement from './elements/FormElement.vue'

export default Vue.extend({
 name: 'Page',
 components: {
  'form-element': FormElement,
 },
 props: ['elements', 'name'],
 methods: {
  updateValue(index: number, value: string) {
    this.$emit('input', index, value)
  },
 },
})
