<template>
  <b-container>
    <b-row>
      {{ book.name }}
    </b-row>
    <b-row> How far did you read? </b-row>
    <b-row class="input">
      <span
        ><b-form-input type="number" v-model="currentLocation"></b-form-input
      ></span>
      location
    </b-row>
    <b-row v-if="currentLocation">
      <span class="calculated">{{ pages }} pages</span>
    </b-row>
    <b-row>
      <b-button type="submit" variant="primary" @click="onSubmit"
        >Submit</b-button
      >
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      goal: "reading",
      book: {
        name: "Klara and the sun",
        totalPages: 307,
        totalLocation: 4235
      },
      currentLocation: 0
    };
  },
  computed: {
    pages() {
      return Math.floor(
        (this.$data.currentLocation * this.$data.book.totalPages) /
          this.$data.book.totalLocation
      );
    }
  },
  methods: {
    onSubmit() {
      const data = [
        {
          beemind: { goalName: "reading" },
          value: `${this.pages}`
        }
      ];

      this.$store
        .dispatch("forms/submitData", data)
        .then(() => {
          this.$bvModal.msgBoxOk("Form was submitted successfully", {
            size: "sm",
            buttonSize: "sm",
            okVariant: "success",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          });
        })
        .catch(e => {
          this.$bvToast.toast(`${e}`, {
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

<style lang="scss" scoped>
.container {
  margin: 10px;
}
.row {
  margin-bottom: 5px;
}
input {
  max-width: 100px;
  margin-right: 5px;
}

.calculated {
  color: grey;
  font-size: 16px;
}
</style>
