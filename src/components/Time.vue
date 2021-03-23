<template>
  <span>
    <span class="time" v-show="time !== ''">{{ formatTimeStamp(time) }}</span>
    <span class="time" v-show="time == '' || time < 1000">waiting</span>
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
    };
  },

  destroyed() {
    window.clearTimeout(this.timer);
  },
  created() {
    this.timeOff = new Date().getTime() - this.startTime; //本地时间与区块时间间隔
    this.fetchData();
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
      this.time = timestamp;
      this.changeTime(this.time);
      this.load = true;
    },
    formatTimeStamp(ms) {
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
      return `${days}:${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>
<style lang="less" scoped>
.time {
  font-size: 16px;
  margin-left: 20px;
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
  padding: 0 10px;
}
</style>
