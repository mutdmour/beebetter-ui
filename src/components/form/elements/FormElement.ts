import Vue from 'vue'
import TextInput from './TextInput.vue'
import RadioGroup from './RadioGroup.vue'

export default Vue.extend({
 name: 'FormElement',
 components: {
  'text-input': TextInput,
  'radio-group': RadioGroup,
 },
 computed: {
  type() {
   return this.$attrs.element.type
  },
  content() {
    return this.$attrs.element.content
  },
 },
})
