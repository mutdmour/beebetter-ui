import Vue from 'vue'
export default Vue.extend({
 name: 'JSONEditor',
 props: ['input'],
 data() {
  return {
   newJson: '',
  }
 },
 computed: {
  json: {
   get() {
    return this.$data.newJson
     ? this.$data.newJson
     : JSON.stringify(this.$props.input, null, 2)
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
