<template>
  <div class="route-loading">
    <div class="base">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
    </div>
    <!-- <div class="loading-text">loading</div> -->
  </div>
</template>

<script>
export default {
  name: 'RouteLoading',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.route-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 10000;
  padding-top: 50px;
  font-size: 12px;
   perspective:1000;
  .text {
    text-align: center;
    font-size: 14px;
    color: #777f8e;
  }
}

.base {
  height: 8em;
  left: 50%;
  margin: -8em;
  padding: 3em;
  position: absolute;
  top: 40%;
  width: 8em;
  transform: rotateX(45deg) rotateZ(45deg);
  transform-style: preserve-3d;
  box-sizing: content-box;
}

.cube,
.cube:after,
.cube:before {
  content: '';
  float: left;
  height: 3em;
  position: absolute;
  width: 3em;
}
.cube {
  background-color: #03a9f4;
  position: relative;
  transform: translateZ(3em);
  transform-style: preserve-3d;
  transition: 0.25s;
  box-shadow: 13em 13em 1.5em rgba(0, 0, 0, 0.1);
  animation: anim 1s infinite;
}
.cube:after {
  background-color: #0785be;
  transform: rotateX(-90deg) translateY(3em);
  transform-origin: 100% 100%;
}
.cube:before {
  background-color: #0785be;
  transform: rotateY(90deg) translateX(3em);
  transform-origin: 100% 0;
}
.cube:nth-child(1) {
  animation-delay: 0.04s;
}
.cube:nth-child(2) {
  animation-delay: 0.08s;
}
.cube:nth-child(3) {
  animation-delay: 0.12s;
}
.cube:nth-child(4) {
  animation-delay: 0.16s;
}

@keyframes anim {
  50% {
    transform: translateZ(0.5em);
  }
}
@keyframes anim1 {
  50% {
    transform: translateX(-60%);
  }
  50% {
    transform: translateX(-50%);
  }
}
.loading-text {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  margin-top: 4em;
  font-size: 16px;
  color: #2196f3;
  animation: anim1 1s infinite;
}

@media (max-width: 767px) {
  .route-loading {
    font-size: 8px;
  }
}
</style>
