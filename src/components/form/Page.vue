<template>
 <div class="page">
  <b-row v-for="(el, index) in elements" v-bind:key="el.name">
   <form-element :name="el.name" v-bind:element="elements[index]"></form-element>
  </b-row>
 </div>
</template>

<script lang="ts" src="./Page.ts"></script>
