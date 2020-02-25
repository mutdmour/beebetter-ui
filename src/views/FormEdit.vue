<template>
 <b-container class="form-editor h-100" v-if="Boolean(form)">
  <b-row>
   <h4 class="float-left ml-2 mt-2">
    {{ form.name }} <b-icon-pencil></b-icon-pencil>
   </h4>
  </b-row>
  <b-row class="h-100">
   <b-tabs content-class="mt-3 h-100" class="w-100 h-100">
    <b-tab title="Designer" disabled></b-tab>
    <b-tab title="JSON Editor" class="w-100 h-75" active>
     <json-editor :input="form" @submit="updateForm" />
    </b-tab>
   </b-tabs>
  </b-row>
 </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import JSONEditor from '../components/JSONEditor.vue'
import { Form } from '../index'
import { mapGetters } from 'vuex'
import { Route } from 'vue-router'

export default Vue.extend({
 name: 'FormEdit',
 computed: {
  ...mapGetters({
   form: 'forms/currentForm',
  }),
 },
 components: {
  'json-editor': JSONEditor,
 },
 created() {
  this.$store.dispatch('forms/getAllForms')
  this.$store.commit(
   'forms/setCurrentFormSlug',
   this.$route.params && this.$route.params.name
  )
 },
 watch: {
  $route(to: Route) {
   this.$store.commit('forms/setCurrentFormSlug', to.params && to.params.name)
  },
 },
 methods: {
  updateForm(form: Form) {
   this.$store.dispatch('forms/updateForm', form).catch((e: string) => {
    alert(e)
   })
  },
 },
})
</script>

