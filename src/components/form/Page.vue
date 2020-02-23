<template>
 <b-container fluid="lg" class="page" v-if="Boolean(elements)">
  <b-row v-for="(el, index) in elements" v-bind:key="index">
   <div v-if="Boolean(el)">
    <form-element
     :element="elements[index]"
     v-on:updated="onElementUpdate(index, $event)"
    ></form-element>
   </div>
  </b-row>
 </b-container>
</template>

<script lang="ts" src="./Page.ts"></script>
