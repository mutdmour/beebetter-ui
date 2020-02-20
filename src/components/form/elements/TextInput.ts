import Vue from 'vue'

export default Vue.extend({
 name: 'TextInput',
 computed: {
   label() {
     return this.$attrs.content.label
   }
 }
})
