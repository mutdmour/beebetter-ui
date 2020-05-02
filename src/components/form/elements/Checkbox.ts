import Vue from "vue";

export default Vue.extend({
  name: "Checkbox",
  props: ["label", "value", "required", "id", "checkedValue", "unCheckedValue"],
  computed: {
    classes: function() {
      return this.$props.value === "1" ? "checked" : "unchecked";
    }
  },
  methods: {
    updateValue(value: string) {
      this.$emit("input", { value });
    }
  }
});
