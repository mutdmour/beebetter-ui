import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

const formatNum = (num: number) => (num < 10 ? `0${num}` : num);

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  return `${formatNum(hours)}:${formatNum(minutes)}:${formatNum(seconds)}`;
};

@Component({
  name: "Timer",
  props: ["label", "value", "id", "state", "timestamp"],
  data: function() {
    return {
      timePassed: 0,
      interval: null
    };
  }
})
export default class Timer extends Vue {
  get formattedTime(): string {
    return formatTime(this.$data.timePassed);
  }

  get canReset(): boolean {
    return this.$props.state === "cancelled" || this.$props.state === "stopped";
  }

  get canStart(): boolean {
    return (
      !this.$props.state ||
      this.$props.state === "paused" ||
      this.$props.state === "reset"
    );
  }

  get isPaused(): boolean {
    return this.$props.state === "paused";
  }

  @Watch("state")
  onStateUpdate() {
    this.updateTimer();
  }

  mounted() {
    this.updateTimer();
  }

  updateTimer() {
    this.$data.timePassed = parseInt(this.$props.value);

    if (this.$props.state === "started") {
      this.$data.timePassed += Math.floor(
        (Date.now() - this.$props.timestamp) / 1000
      );

      this.$data.interval =
        this.$data.interval || setInterval(this.updateTimer, 1000);
    }
  }

  onReset() {
    this.$emit("input", {
      value: `0`,
      state: "reset"
    });
    this.$data.timePassed = 0;
  }

  onStarted() {
    this.$emit("input", {
      value: `${this.$data.timePassed}`,
      state: "started"
    });
    this.$data.interval = setInterval(() => {
      this.$data.timePassed++;
    }, 1000);
  }

  onPaused() {
    this.$emit("input", {
      value: `${this.$data.timePassed}`,
      state: "paused"
    });
    clearInterval(this.$data.interval);
  }

  onStopped() {
    this.$emit("input", {
      value: `${this.$data.timePassed}`,
      state: "stopped"
    });
    clearInterval(this.$data.interval);
  }

  onCancelled() {
    this.$emit("input", {
      value: `${this.$data.timePassed}`,
      state: "cancelled"
    });
    clearInterval(this.$data.interval);
  }
}
