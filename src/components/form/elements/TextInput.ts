import Vue from 'vue'

export default Vue.extend({
 name: 'TextInput',
 props: ['label', 'value'],
 data() {
  return {
   input: '',
  }
 },
 computed: {
  inputLabel(): string {
   return this.$props.label || ''
  },
  textValue: {
   get(): string {
    return this.$data.input || this.$props.value || ''
   },
   set(newValue: string): void {
    this.$data.input = newValue
   },
  },
 },
 methods: {
  updateValue(value: string): void {
   console.log('yo text', value)
   this.$emit('input', value)
  },
 },
})
