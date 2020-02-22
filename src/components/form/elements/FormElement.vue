<template>
 <div class="form-element">
  <text-input
   v-if="type === 'text'"
   :label="content.label"
   :value="content.value"
   v-on:input="updateValue"
  />
  <radio-group
   v-else-if="type === 'radiogroup'"
   :label="content.label"
   :options="content.options"
   :value="content.value"
   v-on:input="updateValue"
  />
 </div>
</template>

<script lang="ts" src="./FormElement.ts"></script>
