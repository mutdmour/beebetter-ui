<template>
  <b-row>
    <label for="datepicker">Choose a date</label>
    <b-form-datepicker
      id="datepicker"
      :value="value"
      class="mb-2"
      size="md"
      :date-format-options="{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }"
      @input="updateValue"
    ></b-form-datepicker>
  </b-row>
</template>

<script lang="ts" src="./DatePicker.ts"></script>
