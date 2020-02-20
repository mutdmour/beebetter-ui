<template>
 <b-row class="text-input">
  <b-col sm="3">
   <label :for="`type`">{{ label }}</label>
  </b-col>
  <b-col sm="9">
   <b-form-input v-model="text" type="type" />
  </b-col>
 </b-row>
</template>

<script lang="ts" src="./TextInput.ts"></script>
