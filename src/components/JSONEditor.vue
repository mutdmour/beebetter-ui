<template>
 <div class="json-editor">
  <b-form>
   <b-form-group id="editor">
    <b-form-textarea id="json-input" required placeholder="{}">
      {{form}}
    </b-form-textarea>
   </b-form-group>
  </b-form>
 </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
 name: 'JSONEditor',
 props: ['form'],
})
</script>
