import Vue from 'vue'
import TextInput from './TextInput.vue'
import RadioGroup from './RadioGroup.vue'

export default Vue.extend({
 name: 'FormElement',
 components: {
  'text-input': TextInput,
  'radio-group': RadioGroup,
 },
 props: ['type', 'content', 'name'],
 methods: {
  updateValue(value: string) {
   this.$emit('input', value)
  },
 },
})
