import Vue from 'vue'
import TextInput from './TextInput.vue'
import RadioGroup from './RadioGroup.vue'

export default Vue.extend({
 name: 'FormElement',
 components: {
  'text-input': TextInput,
  'radio-group': RadioGroup,
 },
 props: ['element'],
 computed: {
  classes() {
   const classes = 'form-element px-4 mb-2 '
   if (this.$props.element.invalid) {
    return classes + 'border border-danger rounded'
   }
   return classes
  },
 },
 methods: {
  updateValue(value: string) {
   this.$emit('updated', value)
  },
 },
})
