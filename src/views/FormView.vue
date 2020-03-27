<template>
 <b-container class="form" v-if="Boolean(form)">
  <b-row v-if="Boolean(form.name)">
   <h4 class="float-left ml-2 mt-2">{{ form.name }} <b-icon-toggles /></h4>
  </b-row>
  <b-row v-if="Boolean(form.pages)">
   <pages :pages="form.pages" v-on:elementUpdated="onElementUpdate" />
  </b-row>
 </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Route } from 'vue-router'
import Pages from '../components/form/Pages.vue'

export default Vue.extend({
 name: 'FormView',
 computed: {
  ...mapGetters({
   form: 'forms/currentForm',
  }),
 },
 components: {
  pages: Pages,
 },
 created() {
  this.$store.dispatch('forms/getAllForms')
  this.$store.commit('forms/setCurrentFormSlug', this.$route.params.name)
 },
 watch: {
  $route(to: Route) {
   this.$store.commit('forms/setCurrentFormSlug', to.params.name)
  },
 },
 methods: {
  onElementUpdate(pageIndex: number, elementIndex: number, value: string) {
   this.$store.commit('forms/updateElement', {
    pageIndex,
    elementIndex,
    value,
   })
  },
 },
})
</script>
