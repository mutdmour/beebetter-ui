<template>
  <b-form-checkbox
    :id="'checkbox-' + id"
    :checked="value == '1'"
    :value="checkedValue"
    :unchecked-value="unCheckedValue"
    :class="classes"
    @change="updateValue"
  >
    {{ label }}
  </b-form-checkbox>
</template>

<script lang="ts" src="./Checkbox.ts"></script>

<style lang="scss">
.checked {
  label {
    color: lightgrey;
    text-decoration: line-through;
  }
}
</style>
