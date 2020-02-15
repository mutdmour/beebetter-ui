<template>
 <div class="forms">
  <h5>Forms</h5>
  <ul>
   <li v-for="form in forms" v-bind:key="form">
    <div>
     {{ form.name }}
    </div>
    <div>
      <b-dropdown right split text="Run" variant="success">
        <b-dropdown-item>Edit</b-dropdown-item>
        <b-dropdown-item>Results</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item variant="danger">Delete</b-dropdown-item>
      </b-dropdown>
    </div>
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
 }
})
</script>

<style scoped lang="scss"></style>
