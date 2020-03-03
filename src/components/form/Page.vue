<template>
 <b-container fluid="lg" class="page" v-if="Boolean(elements)">
  <b-row v-for="(el, index) in elements" v-bind:key="index + pageIndex * 10000">
   <form-element
    v-if="el.type === 'random'"
    :element="el.elements[el.selected]"
    v-on:updated="onElementUpdate(index, $event)"
   >
   </form-element>
   <form-element
    v-else
    :element="el"
    v-on:updated="onElementUpdate(index, $event)"
   ></form-element>
  </b-row>
 </b-container>
</template>

<script lang="ts" src="./Page.ts"></script>
