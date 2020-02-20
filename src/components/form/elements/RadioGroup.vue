<template>
 <b-form-group :label="label">
  <b-form-radio
   v-for="(opt, index) in options"
   v-bind:key="index"
   name="radios"
   value="opt.value"
  >
   {{ opt.label }}
  </b-form-radio>
 </b-form-group>
</template>

<script lang="ts" src="./RadioGroup.ts"></script>
