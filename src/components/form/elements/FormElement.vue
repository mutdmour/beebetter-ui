<template>
  <b-row :class="classes" v-if="element.enabled">
    <text-input
      v-if="element.type === 'text'"
      :label="element.content.label"
      :value="element.content.value"
      :expected="element.content.expected"
      :repeat="element.content.repeat"
      :required="element.required"
      :id="element.id"
      v-on:input="updateValue"
    />
    <radio-group
      v-else-if="element.type === 'radio'"
      :label="element.content.label"
      :options="element.content.options"
      :id="element.id"
      :value="element.content.value"
      :required="element.required"
      v-on:input="updateValue"
    />
    <checkbox
      v-else-if="element.type === 'checkbox'"
      :label="element.content.label"
      :id="element.id"
      :value="element.content.value"
      :unCheckedValue="element.content.unCheckedValue"
      :checkedValue="element.content.checkedValue"
      :required="element.required"
      v-on:input="updateValue"
    />
    <timer
      v-else-if="element.type === 'timer'"
      :label="element.content.label"
      :id="element.id"
      :state="element.content.state"
      :value="element.content.time"
      :required="element.required"
      v-on:input="updateValue"
    />
  </b-row>
</template>

<script lang="ts" src="./FormElement.ts"></script>
