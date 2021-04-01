<template>
  <span>
    <span class="time">
      <template v-if="days > 0">
        <span class="span">{{ days }}</span> : </template
      ><span class="span">{{ hours }}</span> : <span class="span">{{ minutes }}</span> :
      <span class="span">{{ seconds }}</span>
    </span>
    <!-- <span class="time" v-show="time == '' || time < 1000">waiting</span> -->
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
      lastTime: 0, // 记录上一次的时间戳
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
    this.timeOff = new Date().getTime() - this.startTime; //本地时间与区块时间间隔差
    this.fetchData();
    this.updateTime();
  },

  methods: {
    /* 获取未付费订单列表数据 */
    fetchData() {
      this.lastTime = Date.now();
      // 开始倒计时
      this.countDown();
    },

    /* 倒计时 */
    countDown() {
      if (window.requestAnimationFrame) {
        // 浏览器支持requestAnimationFrame
        window.requestAnimationFrame(this.animationCb);
      } else {
        // 用setTimeout兼容
        this.timer = setTimeout(this.setTimeoutCb, 1000);
      }
    },

    /* setTimeout调函数 */
    setTimeoutCb() {
      this.updateTime();
      if (this.time > 1000) {
        this.timer = setTimeout(this.setTimeoutCb, 1000);
      }
    },

    /* requestAnimationFrame回调函数 */
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
      // let end_time = new Date('2021-03-23 19:29:00');
      let end_time = this.endTime - this.timeOff; // 结束时间
      let current_time = new Date();
      let gap = current_time.valueOf() - this.lastTime - 1000; //倒计时-计时器-浏览器进程切后台后，去除进程暂停时间
      if (gap < 0) {
        gap = 0;
      }
      const timestamp = end_time - current_time - gap;
      // console.log(timestamp, '22')
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
