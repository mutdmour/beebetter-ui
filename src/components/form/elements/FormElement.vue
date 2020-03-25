<template>
  <b-row :class="classes" v-if="element.enabled">
    <text-input
      v-if="element.type === 'text'"
      :label="element.content.label"
      :value="element.content.value"
      :expected="element.content.expected"
      :required="element.required"
      v-on:input="updateValue"
    />
    <radio-group
      v-else-if="element.type === 'radio'"
      :label="element.content.label"
      :options="element.content.options"
      :value="element.content.value"
      :required="element.required"
      v-on:input="updateValue"
    />
  </b-row>
</template>

<script lang="ts" src="./FormElement.ts"></script>
