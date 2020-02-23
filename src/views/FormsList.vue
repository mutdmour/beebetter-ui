<template>
 <div class="forms">
  <b-container fluid="lg">
   <b-form-row
    v-for="form in forms"
    v-bind:key="form.id"
    align-v="center"
    class="mt-2"
   >
    <b-col class="text-center align-middle">
     <span>
      {{ form.name }}
     </span>
    </b-col>
    <b-col>
     <b-dropdown
      right
      split
      text="View"
      variant="success"
      size="md"
      :splitHref="'/#/forms/' + form.slug"
     >
      <b-dropdown-item :href="'/#/forms/' + form.slug + '/edit'">
       Edit</b-dropdown-item
      >
      <b-dropdown-item disabled>Results</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item disabled variant="danger">Delete</b-dropdown-item>
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
 name: 'FormsList',
 created() {
  this.$store.dispatch('forms/getAllForms')
 },
 computed: {
  ...mapState({
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   forms: (state: any) => state.forms.forms,
  }),
 },
})
</script>

<style scoped lang="scss"></style>
