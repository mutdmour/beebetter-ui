<template>
 <div class="form-element">
  <text-input
   v-if="type === 'text'"
   :label="content.label"
   :value="content.value"
  />
  <radio-group
   v-else-if="type === 'radiogroup'"
   :label="content.label"
   :options="content.options"
  />
 </div>
</template>

<script lang="ts" src="./FormElement.ts"></script>
