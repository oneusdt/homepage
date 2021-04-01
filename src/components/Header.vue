<!--
 * @Author: lenghui
 * @Description: 公共头 分为四类
-->
<template>
  <div>
    <div class="header">
      <div class="header-left">
        <a href="/">
          <img src="https://i.loli.net/2021/04/01/WEcd5aKH2fT1whR.png" />
          <span class="hidden-xs-only">ForkFinance</span>
          <span class="hidden-sm-and-up">Fork<br />Finance</span>
        </a>
      </div>
      <div class="header-right">
        <div class="nav hidden-xs-only" v-if="path == '/'">
          <ul class="nav-bar" mode="horizontal">
            <a href="#pool"><li class="menu-item">Protocol</li></a>
            <a href="#roadmap"><li class="menu-item">Roadmap</li></a>
            <a href="#tokenomics"><li class="menu-item">Tokenomics</li></a>
            <a href="https://docs.fork-finance.org/" target="_blank"><li class="menu-item">Document</li></a>
            <a href="#join"><li class="menu-item">Join us</li></a>
          </ul>
        </div>
        <div v-if="path !== '/'">
          <el-button
            v-show="accountLoad && !NetErrorBtn"
            type="primary"
            size="medium"
            :class="{ 'account-btn': accounts && !netError }"
            @click="() => (visable = true)"
          >
            {{ !netError && account ? account : 'Connect to a wallet' }}</el-button
          >
          <el-button v-show="accountLoad && NetErrorBtn" icon="el-icon-link" type="danger" size="medium"
            >Wrong Network</el-button
          >
        </div>
      </div>
    </div>
    <Wallet :visable="visable" :close="closeWallet" />
  </div>
</template>
<script>
import initWeb3 from '@/utils/web3';
import Wallet from '@/components/Wallet.vue';
export default {
  name: 'Header',
  components: {
    Wallet,
  },
  data() {
    return {
      visable: false,
      drawerVisable: false,
      netError: false, // 不管用户是否登录 如果节点不匹配 不显示出用户名
      accounts: '',
    };
  },
  async created() {
    await initWeb3();
    await this.init();
    this.netError = this.chainId != process.env.VUE_APP_NETWORK_ID;
  },
  computed: {
    path() {
      return this.$store.state.toPage;
    },
    account() {
      return this.plusXing(this.$store.state.account);
    },
    chainId() {
      return this.$store.state.chainId;
    },
    accountLoad() {
      return this.$store.state.accountLoad;
    },
    loaded() {
      return this.$store.state.loaded;
    },
    // 当从正确的节点切换到不对的节点 才会显示节点错误
    NetErrorBtn() {
      return this.$store.state.NetErrorBtn;
    },
  },
  watch: {
    // 不能用计算属性做class绑定
    account(v) {
      this.accounts = v;
    },
    chainId(v) {
      if (v == process.env.VUE_APP_NETWORK_ID || v == process.env.VUE_APP_NETWORK_ID) {
        this.netError = false;
      }
    },
  },
  methods: {
    // get accout
    async init() {
      console.log('获取');
      const that = this;
      if (window.web3js) {
        // first common get chainId
        const chainId = await web3js.eth.getChainId();
        that.$store.dispatch('changeChain', { key: 'chainId', val: chainId });
        web3js.eth.getAccounts((error, result) => {
          console.log(result, 'res');
          if (!error && result.length > 0) {
            that.$store.dispatch('changeAccount', result[0]);
            that.accounts = result[0];
            that.$store.dispatch('changeWallet', 'MetaMask');
          } //授权成功后result能正常获取到账号了
          this.$store.commit('setAccountLoad');
        });
      } else {
        this.$store.commit('setAccountLoad');
      }
    },
    plusXing(str) {
      if (str.length > 0) {
        return str.substring(0, 5) + '...' + str.substring(str.length - 5);
      }
      return str;
    },
    closeWallet() {
      this.visable = false;
    },
    connect() {
      this.visable = true;
    },
  },
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
  .header .header-left img {
    width: 40px;
    height: 40px;
  }
  .header .header-left span {
    font-size: 14px;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
