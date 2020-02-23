<template>
 <b-form-group :label="label">
  <b-form-input
   v-model="textValue"
   type="text"
   v-on:input="updateValue"
   size="lg"
   :required="required"
  />
 </b-form-group>
</template>

<script lang="ts" src="./TextInput.ts"></script>
