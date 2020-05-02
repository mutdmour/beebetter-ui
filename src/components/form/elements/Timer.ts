import Vue from "vue";

const formatNum = (num: number) => (num < 10 ? `0${num}` : num);

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  return `${formatNum(hours)}:${formatNum(minutes)}:${formatNum(seconds)}`;
};

export default Vue.extend({
  name: "Timer",
  props: ["label", "value", "id", "time"],
  data: function() {
    let interval = null;
    if (this.value === "started") {
      interval = setInterval(() => {
        this.$data.timePassed++;
        this.$data.formattedTime = formatTime(this.$data.timePassed);
      }, 1000);
    }

    const timePassed = this.$props.time;
    return {
      timePassed,
      formattedTime: formatTime(timePassed),
      interval
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
      this.$data.timePassed = 0;
      this.$data.formattedTime = formatTime(this.$data.timePassed);
    },
    onStarted() {
      this.$emit("input", { value: "started" });
      this.$data.interval = setInterval(() => {
        this.$data.timePassed++;
        this.$data.formattedTime = formatTime(this.$data.timePassed);
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
