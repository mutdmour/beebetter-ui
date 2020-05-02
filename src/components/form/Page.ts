import Vue from "vue";
import FormElement from "./elements/FormElement.vue";
import { ElementUpdateEvent } from "../../index";

export default Vue.extend({
  name: "Page",
  components: {
    "form-element": FormElement
  },
  props: ["elements", "name", "pageIndex"],
  methods: {
    onElementUpdate(index: number, event: ElementUpdateEvent) {
      this.$emit("elementUpdated", index, event);
    }
  }
});
