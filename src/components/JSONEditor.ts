import Vue from 'vue'
export default Vue.extend({
 name: 'JSONEditor',
 data() {
  return {
   newJson: '',
  }
 },
 computed: {
  json: {
   get() {
    return JSON.stringify(this.$attrs.value, null, 2)
   },
   set(newJSON: string) {
    this.newJson = newJSON
   },
  },
 },
 methods: {
  onSubmit(e: Event) {
   e.preventDefault()
   try {
    const json = JSON.parse(this.newJson)
    this.$emit('submit', json)
   } catch (e) {
    alert('Error occurred, JSON likely invalid')
   }
  },
 },
})
