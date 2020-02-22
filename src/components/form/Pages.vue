<template>
 <b-container fluid v-if="Boolean(currentPage)">
  <b-row class="ml-2">
   <page
    :name="currentPage.name"
    :elements="currentPage.elements"
    v-on:elementUpdated="onElementUpdated"
   ></page>
  </b-row>
  <b-row class="ml-2 mt-2">
   <b-button
    v-show="hasPrevious"
    @click="onPrevious"
    variant="outline-secondary"
    class="mr-2 ml-2"
   >
    Previous
   </b-button>

   <b-button v-if="isFinal" variant="success" @click="onSubmit">
    Submit
   </b-button>
   <b-button v-else variant="outline-primary" @click="onNext">
    Next
   </b-button>
  </b-row>
 </b-container>
</template>

<script lang="ts" src="./Pages.ts"></script>
