<template>
 <div class="pages">
  <page v-model="currentPage"></page>
  <b-button
   v-show="hasPrevious"
   variant="outline-secondary"
   @click="onPrevious"
  >
   Previous
  </b-button>

  <b-button v-if="isFinal" variant="success" @click="onSubmit">
   Submit
  </b-button>
  <b-button v-else variant="outline-primary" @click="onNext">
   Next
  </b-button>
 </div>
</template>

<script lang="ts" src="./Pages.ts"></script>
