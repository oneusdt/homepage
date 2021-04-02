<template>
  <span>
    <span class="time">
      <template v-if="days > 0">
        <span class="span">{{ days }}</span> : </template
      ><span class="span">{{ hours }}</span> : <span class="span">{{ minutes }}</span> :
      <span class="span">{{ seconds }}</span>
    </span>
  </span>
</template>
<script>
export default {
  name: 'Time',
  props: {
    startTime: Number,
    endTime: Number,
    changeTime: Function,
  },
  data() {
    return {
      time: '',
      timer: null,
      load: false,
      timeOff: 0,
      lastTime: 0, // prev timestamp
      days: 0,
      hours: '00',
      seconds: '00',
      minutes: '00',
    };
  },

  destroyed() {
    window.clearTimeout(this.timer);
  },
  created() {
    this.timeOff = new Date().getTime() - this.startTime; //Difference between local time and block time interval
    this.fetchData();
    this.updateTime();
  },

  methods: {
    fetchData() {
      this.lastTime = Date.now();
      // start countdown
      this.countDown();
    },

    countDown() {
      if (window.requestAnimationFrame) {
        // browser support requestAnimationFrame
        window.requestAnimationFrame(this.animationCb);
      } else {
        // use setTimeout compatible
        this.timer = setTimeout(this.setTimeoutCb, 1000);
      }
    },

    /* setTimeout callback */
    setTimeoutCb() {
      this.updateTime();
      if (this.time > 1000) {
        this.timer = setTimeout(this.setTimeoutCb, 1000);
      }
    },

    /* requestAnimationFrame callback */
    animationCb() {
      if (Date.now() - this.lastTime >= 1000) {
        this.lastTime = Date.now();
        this.updateTime();
        if (this.time < 1000) {
          return false;
        }
      }
      window.requestAnimationFrame(this.animationCb);
    },
    updateTime() {
      let end_time = this.endTime - this.timeOff; // real endtime
      let current_time = new Date();
      let gap = current_time.valueOf() - this.lastTime - 1000; //Countdown-Timer-After the browser process is switched to the background, remove the process pause time
      if (gap < 0) {
        gap = 0;
      }
      const timestamp = end_time - current_time - gap;
      this.time = timestamp;
      this.formatTimeStamp(this.time);
      this.changeTime && this.changeTime(this.time);
      this.load = true;
    },
    formatTimeStamp(ms) {
      if (ms <= 0) {
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
        return false;
      }
      let days = parseInt(ms / (1000 * 60 * 60 * 24)),
        hours =
          parseInt(ms / (1000 * 60 * 60)) >= 24
            ? parseInt(parseInt(ms / 1000 / 60) / 60) % 24
            : parseInt(ms / (1000 * 60 * 60)),
        minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = parseInt((ms % (1000 * 60)) / 1000);
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      return `${days}:${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>
<style lang="less" scoped>
.time {
  margin-top: 4px;
  display: inline-block;
  .span {
    background: #f2f0eb;
    color: #22292f;
    padding: 0 2px;
    border-radius: 3px;
  }
}
@media (max-width: 767px) {
  .time {
    font-size: 14px;
  }
}
</style>
