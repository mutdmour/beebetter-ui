import Vue from 'vue'

export default Vue.extend({
 name: 'RadioGroup',
 props: ['label', 'options', 'value'],
 data() {
  return {
   selectedIndex: null,
  }
 },
 computed: {
  selected: {
   get() {
    return this.$data.selectedIndex !== null
     ? this.$data.selectedIndex
     : this.$props.value
   },
   set(value) {
    this.$data.selectedIndex = value
   },
  },
 },
 methods: {
  updateValue(value: string): void {
   this.$emit('input', value)
  },
 },
})
