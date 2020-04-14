<template>
  <b-row>
    <b-form-group>
      <b-col>
        <label>{{ repeat ? "repeat: " : ""}}{{ label }}</label>
        <b-icon v-show="required" icon="dot" variant="danger"></b-icon>
      </b-col>
      <b-col>
        <b-form-input
          v-model="textValue"
          type="text"
          v-on:input="updateValue"
          size="lg"
          :required="required"
          :state="asExpected"
          @blur="doneTyping"
          @update="onUpdate"
        />
      </b-col>
    </b-form-group>
  </b-row>
</template>

<script lang="ts" src="./TextInput.ts"></script>
