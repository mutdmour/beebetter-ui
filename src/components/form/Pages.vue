<template>
  <b-container fluid v-if="Boolean(currentPage)">
    <b-row class="ml-2">
      <b-container fluid="lg">
        <b-row class="form-element px-4 mb-2">
          <date-picker :value="date" v-on:input="onDateUpdated" />
        </b-row>
      </b-container>
      <page
        :name="currentPage.name"
        :elements="currentPage.elements"
        v-on:elementUpdated="onElementUpdated"
        v-bind:pageIndex="currentPageIndex"
      ></page>
    </b-row>
    <b-row class="ml-2 mt-2">
      <b-button
        v-show="hasPrevious"
        @click="onPrevious"
        variant="outline-secondary"
        class="mr-2 ml-2"
      >
        Previous
      </b-button>

      <b-button v-if="isFinal && canSubmit" variant="success" @click="onSubmit">
        Submit
      </b-button>
      <b-button v-else-if="!isFinal" variant="outline-primary" @click="onNext">
        Next
      </b-button>
    </b-row>
  </b-container>
</template>

<script lang="ts" src="./Pages.ts"></script>
