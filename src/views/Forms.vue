<template>
 <div class="forms">
  <b-container fluid="sm">
   <b-form-row
    v-for="form in forms"
    v-bind:key="form.id"
    align-v="center"
    class="mt-2"
   >
    <b-col>
     <span>
      {{ form.name }}
     </span>
    </b-col>
    <b-col>
     <b-dropdown right split text="Run" variant="success" size="sm">
      <b-dropdown-item>Edit</b-dropdown-item>
      <b-dropdown-item>Results</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item variant="danger">Delete</b-dropdown-item>
     </b-dropdown>
    </b-col>
   </b-form-row>
  </b-container>
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
