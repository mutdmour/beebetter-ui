import Vue from 'vue'

export default Vue.extend({
 name: 'TextInput',
 props: ['label', 'value', 'required'],
 data() {
  return {
   input: '',
  }
 },
 computed: {
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
  updateValue(index: number): void {
   this.$emit('input', index)
  },
 },
})
