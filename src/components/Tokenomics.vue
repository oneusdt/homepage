<template>
  <div class="token">
    <div class="left">
      <div class="menu-title">Tokenomics</div>
      <ul class="menu">
        <li
          v-for="(item, index) of menu"
          :class="{ active: activeIndex == index }"
          :key="index"
          @click="activeIndex = index"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="box" v-show="activeIndex == 0">
        <div class="text">
          <div class="title">{{ menu[0] }}</div>
          <div>Total supply : 188,000,000 $FROK</div>
          <div>4% To the moon Found (0.752 millions)</div>
          <div>10% Development found (1.88 millions)</div>
          <div>4% Warchest (0.8 millions)</div>
          <div>82% Fair launch distribution (15.368 millions)</div>
        </div>
        <div class="icon icon-money" />
      </div>
      <div class="box" v-show="activeIndex == 1">
        <div class="text">
          <div class="title">{{ menu[1] }}</div>
          <div>
            The $FORK of 0.752million(4%) raised 2100 BNB in three installments, and the funds were directly injected
            into the Moon Fund. More details can be found in the documentation
          </div>
        </div>
        <div class="icon icon-accepet" />
      </div>
      <div class="box" v-show="activeIndex == 2">
        <div class="text">
          <div class="title">{{ menu[2] }}</div>
          <div>
            10% of the distributed tokens will go towards funding development and expanding the team, and will be
            subject to the same two-year vesting as the tokens from the Fair Launch Distribution.
          </div>
        </div>
        <div class="icon icon-exchange" />
      </div>
      <div class="box" v-show="activeIndex == 3">
        <div class="text">
          <div class="title">{{ menu[3] }}</div>
          <div>
            There is an allocation of 0.8 million tokens reserved for future strategic expenses. These include listing
            fees, audits, third-party services, liquidity for partnerships, etc. 25000 of these tokens were used to seed
            PancakeSwap's FORK-wBNB pool. To avoid dilution to token holders, we've also implemented a restriction. No
            more than 20000 tokens (~2.5% of the 0.8 million) can be withdrawn each month, with the only exception being
            if there is prior approval from a community vote.
          </div>
        </div>
        <div class="icon icon-refund" />
      </div>
      <div class="box" v-show="activeIndex == 4">
        <div class="text">
          <div class="title">{{ menu[4] }}</div>
          <div>
            FORK will be released over two years with a decaying emissions schedule. In total, there will be 1.88
            million FORK. To incentivize early adopters, there will be a bonus period for the first two weeks.
          </div>
        </div>
        <div class="icon icon-develop" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tokenomics',

  data() {
    return {
      activeIndex: 0,
      menu: [
        'DISTRIBUTION DETAILS',
        'To-the-moon Fund Crowdfunding',
        'Development found',
        'Warchest',
        ' Fair launch distribution',
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.token {
  display: flex;
  max-width: 1024px;
  margin: 0 auto;
  .left {
    .menu-title {
      font-size: 50px;
      color: #283049;
      letter-spacing: -2px;
    }
  }
  .menu {
    font-size: 18px;
    color: #283049;
    li {
      margin: 30px 0;
      cursor: pointer;
      span {
        padding: 10px 0;
      }
    }
    li.active {
      span {
        border-bottom: 3px solid #0ac0b0;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
.box {
  width: 600px;
  // height: 400px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 60px;
  border-radius: 10px;
  line-height: 30px;
  display: flex;
}
.text {
  flex: 1;
  .title {
    font-size: 24px;
    margin-bottom: 30px;
  }
}
.icon {
  width: 120px;
  height: 120px;
  align-self: flex-end;
  margin-bottom: 30px;
  margin-left: 10px;
}
.icon-money {
  background: url('https://i.loli.net/2021/04/01/FtGaeYm3IAOWoHE.png') no-repeat;
  background-size: 100% 100%;
}
.icon-develop {
  background: url('https://i.loli.net/2021/04/01/5N6Y9fyXCLpBuKj.png') no-repeat;
  background-size: 100% 100%;
}
.icon-exchange {
  background: url('https://i.loli.net/2021/04/01/EVqg6UDitW1FHzQ.png') no-repeat;
  background-size: 100% 100%;
}
.icon-refund {
  background: url('https://i.loli.net/2021/04/01/d7yuJQx5Z1EmWe3.png') no-repeat;
  background-size: 100% 100%;
}
.icon-accepet {
  background: url('https://i.loli.net/2021/04/01/nXl7rUE8YdiZQgA.png') no-repeat;
  background-size: 100% 100%;
}

@media (max-width: 991px) {
  .box {
    width: 400px;
  }
}
@media (max-width: 767px) {
  .token {
    flex-direction: column;
    .left {
      .menu-title {
        font-size: 24px;
      }
    }
    .menu {
      font-size: 13px;
      li {
        margin: 10px;
        float: left;
      }
    }
  }
  .box {
    width: 100%;
    flex-direction: column;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
