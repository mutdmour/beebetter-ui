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
  props: ["label", "value", "id", "state"],
  data: function() {
    let interval = null;
    if (this.state === "started") {
      interval = setInterval(() => {
        this.$data.timePassed++;
        this.$data.formattedTime = formatTime(this.$data.timePassed);
      }, 1000);
    }

    const timePassed = parseInt(this.$props.value);
    return {
      timePassed,
      formattedTime: formatTime(timePassed),
      interval
    };
  },
  computed: {
    canReset: function() {
      return this.state === "cancelled" || this.state === "stopped";
    },
    canStart: function() {
      return !this.state || this.state === "paused" || this.state === "reset";
    }
  },
  methods: {
    onReset() {
      this.$emit("input", {
        value: `0`,
        state: "reset"
      });
      this.$data.timePassed = 0;
      this.$data.formattedTime = formatTime(this.$data.timePassed);
    },
    onStarted() {
      this.$emit("input", {
        value: `${this.$data.timePassed}`,
        state: "started"
      });
      this.$data.interval = setInterval(() => {
        this.$data.timePassed++;
        this.$data.formattedTime = formatTime(this.$data.timePassed);
      }, 1000);
    },
    onPaused() {
      this.$emit("input", {
        value: `${this.$data.timePassed}`,
        state: "paused"
      });
      clearInterval(this.$data.interval);
    },
    onStopped() {
      this.$emit("input", {
        value: `${this.$data.timePassed}`,
        state: "stopped"
      });
      clearInterval(this.$data.interval);
    },
    onCancelled() {
      this.$emit("input", {
        value: `${this.$data.timePassed}`,
        state: "cancelled"
      });
      clearInterval(this.$data.interval);
    }
  }
});
