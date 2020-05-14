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
  props: ["label", "value", "id", "state", "timestamp"],
  data: function() {
    let interval = null;
    let timePassed = parseInt(this.$props.value);

    if (this.state === "started") {
      timePassed += Math.floor((Date.now() - this.$props.timestamp) / 1000);

      interval = setInterval(() => {
        this.$data.timePassed =
          parseInt(this.$props.value) +
          Math.floor((Date.now() - this.$props.timestamp) / 1000);
      }, 1000);
    }

    return {
      timePassed,
      interval
    };
  },
  computed: {
    formattedTime: function() {
      return formatTime(this.$data.timePassed);
    },
    canReset: function() {
      return this.state === "cancelled" || this.state === "stopped";
    },
    canStart: function() {
      return !this.state || this.state === "paused" || this.state === "reset";
    },
    isPaused: function() {
      return this.state === "paused";
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
