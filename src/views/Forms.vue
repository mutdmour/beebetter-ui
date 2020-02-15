<template>
 <div class="forms">
  <h5>Forms</h5>
  <ul>
   <li v-for="form in forms" v-bind:key="form">
     <div>
      {{ form.name }}
    </div>
    <div>
      <b-button variant="success"> Run </b-button>
      <b-button> Edit </b-button>
      <b-button variant="outline-primary"> Results </b-button>
      <b-button variant="danger"> Delete </b-button>
    </div>
   </li>
  </ul>
 </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { BButton } from 'bootstrap-vue'

export default Vue.extend({
 name: 'forms',
 created() {
  this.$store.dispatch('forms/getAllForms')
 },
 computed: {
  ...mapState({
   forms: (state: any) => state.forms.forms,
  }),
 },
 components: {
   'b-button': BButton
 }
})
</script>

<style scoped lang="scss"></style>
