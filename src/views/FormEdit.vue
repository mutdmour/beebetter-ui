<template>
 <b-container class="form-editor">
  <b-row>
   <h4 class="float-left ml-2 mt-2">
    {{ $route.params.name }} <b-icon-pencil></b-icon-pencil>
   </h4>
  </b-row>
  <b-row>
   <b-tabs content-class="mt-3">
    <b-tab title="Designer" disabled></b-tab>
    <b-tab title="JSON Editor" active>
     <!-- <json-editor
      v-model="json"
      :options="options"
      :plus="false"
      :height="400px"
      @error="onError"
     /> -->
    </b-tab>
   </b-tabs>
  </b-row>
 </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
// import VJsoneditor from 'v-jsoneditor/src/index'

export default Vue.extend({
 name: 'FormEdit',
 components: {
  // 'json-editor': VJsoneditor,
 },
 watch: {
  $route(to, from) {
   // react to route changes...
  },
 },
})
</script>
