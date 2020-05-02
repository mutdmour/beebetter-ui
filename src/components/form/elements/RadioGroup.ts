import Vue from "vue";

export default Vue.extend({
  name: "RadioGroup",
  props: ["label", "options", "value", "required", "id"],
  data() {
    return {
      selectedValue: null
    };
  },
  computed: {
    selected: {
      get() {
        return this.$data.selectedValue || this.$props.value;
      },
      set(value) {
        this.$data.selectedValue = value;
      }
    }
  },
  methods: {
    updateValue(value: string): void {
      this.$emit("input", { value });
    }
  }
});
