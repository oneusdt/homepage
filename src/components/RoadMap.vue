<template>
  <div class="container">
    <h2>Roadmap</h2>
    <div class="main-time-line">
      <div class="timeline-start" />
      <div class="conference-center-line"></div>
      <!-- 真正的内容 -->
      <div class="timeline-content">
        <div class="horizontal-menu">
          <div class="arrow-left" @click="prevs"></div>
          <div class="menu-wrapper" id="scroll-wrap">
            <div class="menu-wrapper-inner" :id="'scroll'">
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q4 2020</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      Birth of fork-finance project:The idea of IDFO was born and organized like-minded friends. Since
                      then, the fork-finance team has been formally established
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q1 2021</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      Initial development: So far we have completed a lot of core development work
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q1 2021</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      <div>Releasing Fork-Finance website and social medias</div>
                      <div>https://fork-finance.org is online</div>
                      <div>Telegram channel and group are available</div>
                      <div>Twitter account is created</div>
                      <div>Medium account is online</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q1 2021</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      Pre-Sale : We will raise funds during Q1 2021 to recruit and grow the dev team. Recruting : Want
                      to join us? Mail your resume to us and we will view it carefully! We're hiring!
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q1 2021</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      <div>
                        $sFORK token is launch on BSC mainnet: We will launch STIFF FORK token ($sFORK) on binance smart
                        chain once our fundraising event is finished.
                      </div>
                      <div>Hope you see the FORK soon: Continue our development work</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q2 2021</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      <div>Wish more people know about FORK : Promoting FORK on social media</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q2 2021</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      <div>
                        You will see the FORK soon: We will carry out the final test work on the test network. After
                        that we will announce the launch time
                      </div>
                      <div>
                        Most likely you will meet FORK at this time We will cash out your STIFF FORK($sFORK) 1:1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q3 2021</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      <div>
                        IDFO leading $FORK to the moon : Start the first round of IDFO
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu-item-wrapper " style="display:inline-block" role="button">
                <div class="timeline-article timeline-article-top menu-item ">
                  <div class="content-date"><span>Q3 2021</span></div>
                  <div class="meta-date"></div>
                  <div class="content-box">
                    <div>
                      <div>
                        FORK-IDFO must stand out : More high-quality projects will be launched
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="arrow-right " @click="next"></div>
        </div>
      </div>
      <div class="timeline-end" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RoadMap',
  data() {
    return {
      clientWidth: 0,
      prev: {
        x: 0,
        y: 0,
      },
      startPos: { x: 0, y: 0 },
      endPos: { x: 0, y: 0 },
      maxWidth: 0,
    };
  },
  mounted() {
    const scoller = document.getElementById('scroll-wrap');
    this.getWidth();
    scoller.addEventListener('mousedown', this.mouseStart);
    scoller.addEventListener('touchstart', this.touchStart);
    // body.addEventListener('touchmove', this.touchMove);
  },
  beforeDestroy() {
    const scoller = document.getElementById('scroll-wrap');
    scoller.removeEventListener('mousedown', this.mouseStart);
    scoller.removeEventListener('touchstart', this.touchStart);
    // body.removeEventListener('touchmove', this.touchMove);
  },
  methods: {
    getWidth() {
      this.clientWidth = document.body.clientWidth;
    },
    mouseStart(e) {
      this.startPos = {
        x: e.x,
        y: e.y,
        t: new Date(),
      };
      const body = document.getElementById('scroll');
      body.style.transition = 'none';
      const scroller = document.getElementById('scroll-wrap');
      scroller.addEventListener('mousemove', this.mouseMove);
      scroller.addEventListener('mouseup', this.touchEnd);
    },
    mouseMove(event) {
      event.preventDefault();
      const endPos = {
        x: event.x - this.startPos.x + this.prev.x,
        y: event.y - this.startPos.y + this.prev.v,
      };
      const move = `translate3d(${endPos.x}px, 0px, 0px)`;
      const body = document.getElementById('scroll');
      body.style.transform = move;
      this.endPos = endPos;
    },
    touchStart(e) {
      e.preventDefault();
      this.startPos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
        t: new Date(),
      };
      const scoller = document.getElementById('scroll-wrap');
      scoller.addEventListener('touchmove', this.touchMove);
      scoller.addEventListener('touchend', this.touchEnd);
      const body = document.getElementById('scroll');
      body.style.transition = 'none';
    },
    touchMove(event) {
      event.preventDefault();
      //   //当屏幕有多个touch或者页面被缩放过，就不执行move操作
      if (event.targetTouches.length > 1 || (event.scale && event.scale !== 1)) return;
      const touch = event.targetTouches[0];
      const endPos = {
        x: touch.pageX - this.startPos.x + this.prev.x,
        y: touch.pageY - this.startPos.y + this.prev.v,
      };
      const move = `translate3d(${endPos.x}px, 0px, 0px)`;
      const body = document.getElementById('scroll');
      body.style.transform = move;
      this.endPos = endPos;
    },
    touchEnd() {
      const body = document.getElementById('scroll');
      let maxWidth = 0;
      const arr = document.getElementsByClassName('menu-item-wrapper');
      arr.forEach((item, i) => {
        if (i !== arr.length - 1) {
          maxWidth += item.offsetWidth;
        }
      });
      body.style.transition = 'all .25s ease-out';
      if (this.endPos.x > 0) {
        this.endPos.x = 0;
        body.style.transform = `translate3d(0px, 0px, 0px)`;
      } else if (this.endPos.x < -maxWidth) {
        this.endPos.x = -maxWidth;
        body.style.transform = `translate3d(${-maxWidth}px, 0px, 0px)`;
      }
      this.prev = this.endPos;
      const scoller = document.getElementById('scroll-wrap');
      scoller.removeEventListener('touchmove', this.touchMove);
      scoller.removeEventListener('touchend', this.touchEnd);
      scoller.removeEventListener('mousemove', this.mouseMove);
      scoller.removeEventListener('mouseup', this.touchEnd);
    },

    prevs() {
      const width = document.getElementsByClassName('menu-item-wrapper')[0].offsetWidth;
      if (this.endPos.x + width >= 0) {
        this.endPos.x = 0;
      } else {
        this.endPos.x = this.endPos.x + width;
      }
      const move = `translate3d(${this.endPos.x}px, 0px, 0px)`;
      const body = document.getElementById('scroll');
      body.style.transition = 'all .25s ease-out';
      body.style.transform = move;
    },
    next() {
      const width = document.getElementsByClassName('menu-item-wrapper')[0].offsetWidth;
      let maxWidth = 0;
      const arr = document.getElementsByClassName('menu-item-wrapper');
      arr.forEach((item, i) => {
        if (i !== arr.length - 1) {
          maxWidth += item.offsetWidth;
        }
      });
      if (this.endPos.x - width <= -maxWidth) {
        this.endPos.x = -maxWidth;
      } else {
        this.endPos.x = this.endPos.x - width;
      }
      const move = `translate3d(${this.endPos.x}px, 0px, 0px)`;
      const body = document.getElementById('scroll');
      body.style.transition = 'all .25s ease-out';
      body.style.transform = move;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 0 16px;
}
.w-30 {
  width: 30px;
  height: 30px;
}
h2 {
  font-size: 50px;
  margin: 30px 0;
  text-align: center;
}
.main-time-line {
  position: relative;
  width: 100%;
  margin: auto;
  min-height: 300px;
  margin-top: 96px;
}
.conference-center-line {
  position: absolute;
  width: 100%;
  height: 5px;
  //   top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(90deg, #a894f8, #72b9e9);
}
.timeline-start {
  position: absolute;
  background: #72b9e9;
  border-radius: 100px;
  //   top: 50%;
  transform: translateY(-50%);
  .w-30;
  z-index: 100;
}
.timeline-end {
  .timeline-start;
  right: 0;
  top: 0;
}
.timeline-content {
  position: relative;
}
.horizontal-menu {
  display: flex;
  user-select: none;
  align-items: flex-end;
  left: 0;
  right: 0;
  top: -56px;
  position: absolute;
}
.menu-wrapper {
  overflow: hidden;
  max-width: 80%;
  margin: 0 auto;
}
.menu-item-wrapper {
  max-width: 300px;
  padding-right: 10px;
}
.menu-wrapper-inner {
  white-space: nowrap;
  text-align: left;
  display: flex;
}
.menu-item {
  width: 300px;
  margin: 5px 0px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  border: none;
  position: relative;
}
.timeline-article .content-date {
  // position: absolute;
  /* top: 35%; */
  /* left: -30px; */
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
.timeline-article .meta-date {
  box-shadow: 0 0 4px 4px #72b9e9;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: #fff;
  border: 1px solid #fff;
  margin: 0 auto;
}
.timeline-article .content-box {
  position: relative;
  padding: 15px 0px;
  text-align: left;
  margin-top: 40px;
  max-height: 200px;
  //   overflow: auto;
  white-space: break-spaces;
  div {
    word-break: break-word;
  }
}
.content-box::before {
  content: ' ';
  position: absolute;
  left: 50%;
  margin-top: 0;
  margin-bottom: 10px;
  height: 39px;
  background: linear-gradient(90deg, #a894f8, #72b9e9);
  width: 2px;
  top: -30px;
}
.content-date {
  color: #72b9e9;
  font-size: 18px;
}
.arrow-left {
  width: 30px;
  height: 30px;
  background: url('https://i.loli.net/2021/04/01/eO7cAyq2CfaBmx3.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 10%;
  top: 50%;
  margin-top: -15px;
  margin-left: -70px;
  cursor: pointer;
}
.arrow-right {
  width: 30px;
  height: 30px;
  background: url('https://i.loli.net/2021/04/01/kmaS4AIzY6C7PpJ.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 10%;
  top: 50%;
  margin-top: -15px;
  margin-right: -70px;
  cursor: pointer;
}
@media (max-width: 991px) {
}
@media (max-width: 767px) {
  .main-time-line {
    min-height: 260px;
  }
  h2 {
    font-size: 30px;
  }
  .timeline-start,
  .timeline-end {
    width: 20px;
    height: 20px;
  }
  .conference-center-line {
    height: 3px;
  }
  .timeline-article .meta-date {
    width: 20px;
    height: 20px;
  }
  .horizontal-menu {
    top: -52px;
  }
  .arrow-left {
    margin-left: -40px;
  }
  .arrow-right {
    margin-right: -40px;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
