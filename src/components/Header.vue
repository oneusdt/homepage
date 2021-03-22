<!--
 * @Author: lenghui
 * @Description: 公共头 分为四类
-->
<template>
  <div class="header">
    <div class="header-left">
      <a>
        <img src="https://img.bee-cdn.com/large/3b9ae203lz1gosu29cz4cj201701bq2r.jpg" />
        <span>ForkFinance</span>
      </a>
    </div>
    <div class="header-right">
      <div class="nav hidden-xs-only">
        <ul class="nav-bar" mode="horizontal">
          <a href="#pool"><li class="menu-item">Protocol</li></a>
          <a href="#roadmap"><li class="menu-item">Roadmap</li></a>
          <a href="#tokenomics"><li class="menu-item">Tokenomics</li></a>
          <a href="https://docs.fork-finance.org/" target="_blank"><li class="menu-item">Document</li></a>
          <a href="#join"><li class="menu-item">Join us</li></a>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
};
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 990;
  transition: 0.3s;
  display: flex;
  padding: 10px 50px;
  box-shadow: 0 2px 8px 0 #e8f6ff;
  background: #fff;
  .header-left {
    img {
      width: 50px;
      height: 50px;
    }
    a {
      display: flex;
      align-items: center;
      color: #17adff;
      font-size: 30px;
      cursor: pointer;
    }
    span {
      margin-left: 10px;
    }
  }
  .header-right {
    flex: 1;
  }
  .nav {
    display: flex;
    justify-content: flex-end;
    height: 100%;
  }
}
.nav-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  li {
    margin-left: 40px;
    font-size: 16px;
    color: #17adff;
    cursor: pointer;
  }
  a:first-child li {
    margin-left: 0;
  }
}
@media (max-width: 992px) {
  .header {
    padding: 10px 20px;
  }
  .header .header-left a {
    font-size: 24px;
  }
  .nav-bar {
    li {
      margin-left: 20px;
    }
  }
}
@media (max-width: 767px) {
  .header .header-left a {
    font-size: 20px;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
