import Vue from 'vue'

export default Vue.extend({
 name: 'RadioGroup',
 computed: {
  label() {
    return this.$attrs.content.label
  },
  options() {
    return this.$attrs.content.options
  }
}
})
