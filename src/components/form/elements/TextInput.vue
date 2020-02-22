<template>
 <b-row class="text-input">
  <b-col sm="3">
   <label for="text">{{ inputLabel }}</label>
  </b-col>
  <b-col sm="9">
   <b-form-input
    v-model="textValue"
    type="text"
    v-on:input="updateValue($event.target.value)"
   />
  </b-col>
 </b-row>
</template>

<script lang="ts" src="./TextInput.ts"></script>
