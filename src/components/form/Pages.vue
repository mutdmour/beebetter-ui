<template>
 <b-container fluid>
  <b-row class="ml-2">
   <page v-bind:page="currentPage"></page>
  </b-row>
  <b-row class="ml-2 mt-2">
   <b-button
    v-show="hasPrevious"
    variant="outline-secondary"
    @click="onPrevious"
    class="mr-2 ml-2"
   >
    Previous
   </b-button>

   <b-button v-if="isFinal" variant="success" @click="onSubmit" >
    Submit
   </b-button>
   <b-button v-else variant="outline-primary" @click="onNext">
    Next
   </b-button>
  </b-row>
 </b-container>
</template>

<script lang="ts" src="./Pages.ts"></script>
