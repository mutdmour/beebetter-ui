<template>
 <b-container class="form">
  <b-row>
   <h4 class="float-left ml-2 mt-2">{{ form.name }} <b-icon-toggles /></h4>
  </b-row>
  <b-row>
   <form-pages v-model="form.pages" />
  </b-row>
 </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Route } from 'vue-router'
import FormPages from '../components/FormPages'

export default Vue.extend({
 name: 'Form',
 computed: {
  ...mapGetters({
   form: 'forms/currentForm',
  }),
 },
 components: {
  'form-pages': FormPages,
 },
 created() {
  this.$store.dispatch('forms/getAllForms')
  this.$store.commit('forms/setCurrentForm', this.$route.params.name)
 },
 watch: {
  $route(to: Route) {
   this.$store.commit('forms/setCurrentForm', to.params.name)
  },
 },
})
</script>
