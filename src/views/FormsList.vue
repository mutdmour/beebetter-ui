<template>
  <div class="forms">
    <b-container fluid="md">
      <!-- <b-icon-alarm v-else-if="form.type === 'timer'" />
        <b-icon-check v-else-if="form.type === 'checklist'" /> -->
      <b-form-row
        v-for="form in forms"
        v-bind:key="form.id"
        align-v="center"
        class="mt-2"
      >
        <b-col cols="5">
          <span>
            <b-icon-toggles />
            {{ form.name }}:
          </span>
        </b-col>
        <b-col>
          <b-dropdown
            right
            split
            text="View"
            variant="success"
            size="md"
            :splitHref="'/#/forms/' + form.slug"
          >
            <b-dropdown-item :href="'/#/forms/' + form.slug + '/edit'">
              Edit</b-dropdown-item
            >
            <b-dropdown-item disabled>Results</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item variant="danger" @click="onDelete(form.id)"
              >Delete</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
      </b-form-row>

      <b-form-row
        v-for="form in timers"
        v-bind:key="form.id"
        align-v="center"
        class="mt-2"
      >
        <b-col cols="5">
          <span> <b-icon-alarm /> {{ form.name }}: </span>
        </b-col>
        <b-col>
          <b-dropdown
            right
            split
            text="View"
            variant="success"
            size="md"
            :splitHref="'/#/forms/' + form.slug"
          >
            <b-dropdown-item :href="'/#/forms/' + form.slug + '/edit'">
              Edit</b-dropdown-item
            >
            <b-dropdown-item disabled>Results</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item variant="danger" @click="onDelete(form.id)"
              >Delete</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
      </b-form-row>

      <b-form-row
        v-for="form in checklists"
        v-bind:key="form.id"
        align-v="center"
        class="mt-2"
      >
        <b-col cols="5">
          <span> <b-icon-check /> {{ form.name }}: </span>
        </b-col>
        <b-col>
          <b-dropdown
            right
            split
            text="View"
            variant="success"
            size="md"
            :splitHref="'/#/forms/' + form.slug"
          >
            <b-dropdown-item :href="'/#/forms/' + form.slug + '/edit'">
              Edit</b-dropdown-item
            >
            <b-dropdown-item disabled>Results</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item variant="danger" @click="onDelete(form.id)"
              >Delete</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
      </b-form-row>

      <b-form-row v-if="createMode" class="mt-2" align-v="center">
        <b-col cols="5">
          <b-form-group id="create-group-1">
            <b-form-input
              id="slug-input"
              placeholder="URL slug"
              v-model="slug"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button variant="primary" @click="onCreated">Create</b-button>
        </b-col>
        <b-col class="d-none d-lg-block d-md-block"></b-col>
      </b-form-row>
      <b-form-row v-else class="mt-2" align-v="center">
        <b-col cols="5"></b-col>
        <b-col>
          <b-form-group id="create-new-group-1">
            <b-button variant="outline-primary" @click="onCreate"
              >Create new</b-button
            >
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { mapState } from "vuex";
import { Form } from "..";

export default Vue.extend({
  name: "FormsList",
  data: () => ({
    createMode: false,
    slug: ""
  }),
  created() {
    this.$store.dispatch("forms/getAll");
  },
  computed: {
    ...mapState({
      forms: (state: any) =>
        state.forms.forms.filter((form: Form) => form.type === "form"),
      timers: (state: any) =>
        state.forms.forms.filter((form: Form) => form.type === "timer"),
      checklists: (state: any) =>
        state.forms.forms.filter((form: Form) => form.type === "checklist")
    })
  },
  methods: {
    onCreate: function() {
      this.$data.createMode = true;
    },
    onCreated: function() {
      this.$store
        .dispatch("forms/create", this.slug)
        .then(() => {
          this.$bvToast.toast("Form created successfully", {
            variant: "success",
            solid: false,
            appendToast: true,
            noCloseButton: true
          });
          this.$router.push(`/forms/${this.slug}/edit`);
        })
        .catch(e => {
          this.$bvToast.toast(e, {
            variant: "danger",
            solid: false,
            appendToast: true,
            noCloseButton: true
          });
        });
    },
    onDelete: function(formId: number) {
      this.$store
        .dispatch("forms/delete", formId)
        .then(() => {
          this.$bvToast.toast("Form deleted successfully", {
            variant: "success",
            solid: false,
            appendToast: true,
            noCloseButton: true
          });
        })
        .catch(e => {
          this.$bvToast.toast(e, {
            variant: "danger",
            solid: false,
            appendToast: true,
            noCloseButton: true
          });
        });
    }
  }
});
</script>

<style scoped lang="scss"></style>
