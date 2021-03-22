<template>
  <div class="footer" id="join">
    <div class="footer-left">
      <img src="https://img.bee-cdn.com/large/3b9ae203lz1gosu29cz4cj201701bq2r.jpg" />
      <div class="info">
        <div class="join">JOIN US</div>
        <div>Email: hanshaton@turtledex.io</div>
        <div>Phone: 101093209302</div>
      </div>
    </div>
    <div class="footer-right">
      <ul class="footer-icon-list">
        <li class="icon twitter"></li>
        <li class="icon telegram"></li>
        <li class="icon med"></li>
        <li class="icon discord"></li>
        <li class="icon file"></li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.footer {
  display: flex;
  padding: 30px 50px 50px;
  background: #75bae7;
}
.footer-left {
  display: flex;
  color: #fff;
  img {
    width: 50px;
    height: 50px;
    margin-right: 16px;
  }
  .info {
    .join {
      font-size: 30px;
    }
  }
}
.footer-right {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  ul {
    float: right;
    display: flex;
    li {
      margin: 0 10px;
      cursor: pointer;
    }
  }
  img {
    width: 30px;
    height: 30px;
    display: block;
  }
}
.icon {
  width: 30px;
  height: 30px;
}
.twitter {
  background: url('../assets/images/twitter.png') no-repeat;
  background-size: 100% 100%;
}
.telegram {
  background: url('../assets/images/telegram.png') no-repeat;
  background-size: 100% 100%;
}
.med {
  background: url('../assets/images/med.png') no-repeat;
  background-size: 100% 100%;
}
.discord {
  background: url('../assets/images/discord.png') no-repeat;
  background-size: 100% 100%;
}
.file {
  background: url('../assets/images/file.png') no-repeat;
  background-size: 100% 100%;
}

@media (max-width: 991px) {
}
@media (max-width: 767px) {
  .footer {
    flex-direction: column;
    padding: 10px;
  }
  .footer-left img {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }
  .info {
    font-size: 13px;
    .join {
      font-size: 18px;
    }
  }
  .footer-right {
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
