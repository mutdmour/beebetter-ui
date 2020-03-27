<template>
 <b-form @submit="onSubmit" class="h-100">
  <b-container class="h-100">
   <b-row class="h-75">
    <b-form-textarea id="json-input" v-model="json" required class="h-100">
     {{ this.$data.json }}
    </b-form-textarea>
   </b-row>
   <b-row class="mt-3 ml-3">
    <b-button type="submit" variant="primary">Submit</b-button>
   </b-row>
  </b-container>
 </b-form>
</template>

<script lang="ts" src="./JSONEditor.ts"></script>
