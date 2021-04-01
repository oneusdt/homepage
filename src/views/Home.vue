<template>
  <div class="home">
    <div class="banner">
      <div class="banner-inner">
        <h1>Welcome to Defi DreamWorks</h1>
        <p class="hidden-xs-only">
          A defi factory on Binance Smart Chain that produces <br />
          defi-project in a yield farming way
        </p>
        <p class="hidden-sm-and-up">
          A defi factory on Binance Smart Chain that produces defi-project in a yield farming way
        </p>
        <a href="/pools"><div class="banner-btn">Crowdfunding</div></a>
      </div>
      <div class="banner-bg" />
    </div>
    <!-- design -->
    <div class="section section-1" id="pool">
      <div class="section-1-con">
        <el-row>
          <el-col :md="12">
            <div class="big-title">Protocol Design</div>
            <p class="font-16">
              The existence of Fork-finance is to solve the three major problems of the current DEFI project: fund
              security issues/insufficient wealth effect/too short dividend period. For this reason, we have carefully
              designed the agreement.
            </p>
          </el-col>
        </el-row>
        <el-row class="sub" :gutter="30">
          <el-col :md="8" :sm="24" :xs="24" class="sub-con">
            <div class="sub-title">
              <img src="https://img.bee-cdn.com/large/3b9ae203lz1gosvp8v9u2j200u00u741.jpg" />Safety
            </div>
            <p class="font-14">
              Every contract will be open source Each contract is owned by Timelock Resolutely do not use proxy
              contracts, once deployed, they can never be modified
            </p>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24" class="sub-con">
            <div class="sub-title">
              <img src="https://img.bee-cdn.com/large/3b9ae203lz1gosvp8v9u2j200u00u741.jpg" />Wealth effect
            </div>
            <p class="font-14">
              The design of removing a pool and the pull of private equity funds push the wealth effect to a new height,
              and finally complete the closed loop through IDFO.
            </p>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24" class="sub-con">
            <div class="sub-title">
              <img src="https://img.bee-cdn.com/large/3b9ae203lz1gosvp8v9u2j200u00u741.jpg" />Continuity
            </div>
            <p class="font-14">
              The wealth effect brings capital and flow, which completes the closed loop in IDFO, and continues to
              promote the wealth effect and prosperity of the ecology. This is the DEFI project dream factory based on
              the IDFO protocol, a defi's perpetual
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- total -->
    <div class="section section-2">
      <Table />
    </div>
    <!-- RoadMap -->
    <div class="section section-3" id="roadmap">
      <RoadMap />
    </div>
    <!-- Tokenomics -->
    <div class="token-wrap" id="tokenomics">
      <Tokenomics />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table';
import RoadMap from '@/components/RoadMap';
import Tokenomics from '@/components/Tokenomics';
export default {
  name: 'Home',
  components: {
    Table,
    RoadMap,
    Tokenomics,
  },
  data() {
    return {
      tableData: [
        {
          pool: '1',
          apy: 'N/A',
          tvl: '$ N/A',
          be: 'Fork Finance',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
}
//banner
.banner {
  padding: 64px 0 40px;
}
.banner-bg {
  background: url(https://i.loli.net/2021/04/01/2YSlrPF1RzNy6IJ.png) no-repeat;
  background-size: 100%;
  width: 100%;
  padding-bottom: 27.5%;
}
.banner-inner {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
  h1 {
    font-size: 50px;
    color: #333;
  }
  p {
    font-size: 18px;
    color: #333;
    margin-top: 20px;
  }
  .banner-btn {
    margin-top: 70px;
    display: inline-block;
    padding: 10px 50px;
    background: #0092f1;
    font-size: 18px;
    border-radius: 30px;
    color: #fff;
    box-shadow: 0 2px 4px 0 #75bae7;
    cursor: pointer;
  }
}
.section {
  max-width: 1024px;
  margin: 0 auto;
}
// pool
.section-1 {
  padding: 20px;
  .section-1-con {
    color: #fff;
    background: #75bae7;
    box-shadow: 0 2px 10px 0 rgb(0 0 0 / 30%);
    padding: 45px;
    border-radius: 10px;
    position: relative;
    &::after {
      content: ' ';
      background: url('https://i.loli.net/2021/04/01/cHnU7doO8uQ9Ttw.png') no-repeat;
      background-size: 100% 100%;
      width: 150px;
      height: 96px;
      position: absolute;
      top: 0;
      right: 45px;
      margin-left: auto;
    }
    &::before {
      content: ' ';
      background: url('https://i.loli.net/2021/04/01/jaebJAvMSYm4CTw.png') no-repeat;
      background-size: 100% 100%;
      width: 400px;
      height: 74px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .big-title {
    font-size: 50px;
    text-decoration: underline;
    text-underline-offset: 16px;
    margin-bottom: 20px;
  }
  .font-16 {
    font-size: 16px;
  }
  .font-14 {
    font-size: 14px;
  }
  .sub {
    margin-top: 50px;
    .sub-title {
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      img {
        margin-right: 18px;
      }
    }
  }
}

.token-wrap {
  padding: 100px 60px;
  background: url('https://img.bee-cdn.com/large/3b9ae203lz1gosv6nzr3rj20xc0ft0y1.jpg');
}

@media (max-width: 991px) {
  .banner-inner {
    max-width: 700px;
  }
  .banner-inner h1 {
    font-size: 36px;
  }
  .section-1 {
    padding: 0 30px 45px;
    .section-1-con {
      padding: 30px 16px;
      &::after {
        width: 120px;
        height: 80px;
        right: 20px;
      }
    }
    .big-title {
      font-size: 30px;
    }
  }
  .sub {
    margin-top: 40px;
    .sub-con {
      margin: 10px 0;
    }
    .sub-title {
      display: flex;
      align-items: center;
      img {
        margin-right: 18px;
      }
    }
  }
  .table {
    max-width: 700px;
  }
  .token-wrap {
    padding: 50px 16px;
  }
}
@media (max-width: 767px) {
  .banner-inner {
    max-width: 540px;
    padding: 0 10px;
  }
  .banner-inner {
    h1 {
      font-size: 30px;
    }
    p {
      font-size: 14px;
    }
    .banner-btn {
      font-size: 14px;
    }
  }
  .table {
    width: 500px;
  }
  .token-wrap {
    padding: 50px 16px;
  }
  .section-1 {
    padding: 0 16px 32px;
    .section-1-con {
      &::before {
        width: 280px;
        height: 51px;
      }
      &::after {
        width: 80px;
        height: 50px;
        right: 16px;
      }
    }
  }
  .timeline-article .content-box {
    font-size: 13px;
  }
}
@media (min-width: 992px) {
  .banner-inner {
    max-width: 700px;
  }
  .banner-inner h1 {
    font-size: 45px;
  }
  .table {
    width: 100%;
  }
}
@media (min-width: 1200px) {
  .banner-inner {
    max-width: 750px;
  }
  .banner-inner h1 {
    font-size: 50px;
  }
}
</style>
