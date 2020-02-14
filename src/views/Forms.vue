<template>
 <div class="forms">
  <h5>Forms</h5>
  <ul>
   <li v-for="form in forms" v-bind:key="form">
    {{ form.name }}
   </li>
  </ul>
 </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
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
})
</script>

<style scoped lang="scss"></style>
