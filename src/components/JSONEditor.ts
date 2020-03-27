import Vue from 'vue'
export default Vue.extend({
 name: 'JSONEditor',
 props: ['input'],
 data() {
  return {
   newJson: JSON.stringify(this.$props.input, null, 2),
  }
 },
 computed: {
  json: {
   get() {
    return this.$data.newJson
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
    this.$bvToast.toast('Invalid JSON object', {
     variant: 'danger',
     solid: false,
     appendToast: true,
     noCloseButton: true,
    })
   }
  },
 },
})
