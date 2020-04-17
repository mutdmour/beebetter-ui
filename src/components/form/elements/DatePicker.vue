<template>
  <div>
    <label for="datepicker">Choose a date</label>
    <b-form-datepicker
      id="datepicker"
      v-model="value"
      class="mb-2"
      today-button
      close-button
      size="md"
      :date-format-options="{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }"
      @input="updateValue"
    ></b-form-datepicker>
  </div>
</template>

<script lang="ts" src="./DatePicker.ts"></script>
