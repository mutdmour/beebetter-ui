import Vue from "vue";

export default Vue.extend({
  name: "Timer",
  props: ["label", "value", "id", "time"],
  data: function() {
    return {
      timePassed: this.$props.time,
      interval: null
    };
  },
  computed: {
    canReset: function() {
      return this.value === "cancelled" || this.value === "stopped";
    },
    canStart: function() {
      return !this.value || this.value === "paused" || this.value === "reset";
    }
  },
  methods: {
    onReset() {
      this.$emit("input", {
        value: "reset"
      });
      this.$data.timePassed = this.$props.time;
    },
    onStarted() {
      this.$emit("input", { value: "started" });
      this.$data.interval = setInterval(() => {
        this.$data.timePassed++;
      }, 1000);
    },
    onPaused() {
      this.$emit("input", { value: "paused" });
      clearInterval(this.$data.interval);
    },
    onStopped() {
      this.$emit("input", { value: "stopped" });
      clearInterval(this.$data.interval);
    },
    onCancelled() {
      this.$emit("input", {
        value: "cancelled"
      });
      clearInterval(this.$data.interval);
    }
  }
});
