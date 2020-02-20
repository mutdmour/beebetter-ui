<template>
 <div class="form-element">
  <text-input v-if="type === 'text'" v-bind:content="content" />
  <radio-group v-else-if="type === 'radiogroup'" v-bind:content="content" />
 </div>
</template>

<script lang="ts" src="./FormElement.ts"></script>
