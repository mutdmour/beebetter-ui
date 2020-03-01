import Vue from 'vue'

export default Vue.extend({
 name: 'TextInput',
 props: ['label', 'value', 'required', 'expected'],
 data() {
  return {
   input: '',
   typing: false,
  }
 },
 computed: {
  textValue: {
   get(): string {
     console.log('get', this.$data.input || this.$props.value || '')
    return this.$data.input || this.$props.value || ''
   },
   set(newValue: string): void {
     console.log('set', newValue)
    this.$data.input = newValue
   },
  },
  asExpected() {
   if (
    this.$props.expected === null ||
    this.$data.input.length === 0 ||
    this.$data.typing
   ) {
    return null
   }
   return this.$props.expected === this.$data.input
  },
 },
 methods: {
  updateValue(index: number): void {
   this.$emit('input', index)
  },
  doneTyping() {
   this.$data.typing = false
  },
  onUpdate() {
   this.$data.typing = true
  },
 },
})
