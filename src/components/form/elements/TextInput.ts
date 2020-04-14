import Vue from "vue";

export default Vue.extend({
  name: "TextInput",
  props: ["label", "value", "required", "expected", "id", "repeat"],
  data() {
    return {
      input: "",
      typing: false
    };
  },
  computed: {
    textValue: {
      get(): string {
        return this.$data.input || this.$props.value || "";
      },
      set(newValue: string): void {
        this.$data.input = newValue;
      }
    },
    asExpected() {
      const expected = this.$props.repeat
        ? this.$props.label
        : this.$props.expected;
      if (
        expected === null ||
        this.$data.input.length === 0 ||
        this.$data.typing
      ) {
        return null;
      }
      return (
        expected.trim().toLocaleLowerCase() ===
        this.$data.input.trim().toLocaleLowerCase()
      );
    }
  },
  methods: {
    updateValue(index: number): void {
      this.$emit("input", index);
    },
    doneTyping() {
      this.$data.typing = false;
    },
    onUpdate() {
      this.$data.typing = true;
    }
  }
});
