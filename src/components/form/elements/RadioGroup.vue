<template>
 <b-row>
  <b-form-group>
   <b-col>
    <label>{{ label }}</label>
    <b-icon v-show="required" icon="dot" variant="danger"></b-icon>
   </b-col>

   <b-col>
    <b-form-radio
     v-for="(opt, index) in options"
     v-bind:key="index"
     v-on:input="updateValue"
     :name="'radios-' + id"
     v-model="selected"
     :value="opt.value"
     :required="required"
    >
     {{ opt.label }}
    </b-form-radio>
   </b-col>
  </b-form-group>
 </b-row>
</template>

<script lang="ts" src="./RadioGroup.ts"></script>
