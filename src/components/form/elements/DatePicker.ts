import Vue from "vue";

export default Vue.extend({
  name: "DatePicker",
  props: ["value"],
  methods: {
    updateValue(value: string) {
      this.$emit("input", value);
    }
  }
});
