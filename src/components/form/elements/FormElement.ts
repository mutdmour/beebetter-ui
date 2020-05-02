import Vue from "vue";
import TextInput from "./TextInput.vue";
import RadioGroup from "./RadioGroup.vue";
import Checkbox from "./Checkbox.vue";
import Timer from "./Timer.vue";
import { ElementUpdateEvent } from "../../../index";

export default Vue.extend({
  name: "FormElement",
  components: {
    "text-input": TextInput,
    "radio-group": RadioGroup,
    checkbox: Checkbox,
    timer: Timer
  },
  props: ["element"],
  computed: {
    classes() {
      const classes = "form-element px-4 mb-2 ";
      if (this.$props.element.invalid) {
        return classes + "border border-danger rounded";
      }
      return classes;
    }
  },
  methods: {
    updateValue(event: ElementUpdateEvent) {
      this.$emit("updated", event);
    }
  }
});
