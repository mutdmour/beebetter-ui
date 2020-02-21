<template>
 <b-row class="text-input">
  <b-col sm="3">
   <label for="text">{{ label }}</label>
  </b-col>
  <b-col sm="9">
   <b-form-input v-model="value" type="text" />
  </b-col>
 </b-row>
</template>

<script lang="ts" src="./TextInput.ts"></script>
