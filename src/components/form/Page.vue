<template>
 <div class="page" v-if="Boolean(elements)">
  <b-row v-for="(el, index) in elements" v-bind:key="index">
   <div v-if="Boolean(el)">
    <form-element
     :type="el.type"
     :name="el.name"
     :content="elements[index].content"
     v-on:updated="onElementUpdate(index, $event)"
    ></form-element>
   </div>
  </b-row>
 </div>
</template>

<script lang="ts" src="./Page.ts"></script>
