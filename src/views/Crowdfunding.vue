<template>
  <div class="crowd-wrap">
    <div class="crowd" v-if="!unusual">
      <div class="top">
        <h2>{{ card.title }} Private Pool</h2>
        <p>
          0x4F7d4aCF1A2d92C5b64a7365e3cD2185c91F9e40
          <span @click="copy">
            <i class="el-icon-copy-document"></i>
          </span>
        </p>
        <el-tag class="tag" type="warning"
          >This is a smart contract address, please do not transfer any token into it.</el-tag
        >
      </div>
      <div class="middle">
        <div class="pool-card">
          <van-skeleton :row="8" class="m-skeleton" :loading="skeletonLoading">
            <div class="flex">
              <span>Swap Amount</span><span v-if="account && white">Credit remaining {{ BNB }} BNB</span>
            </div>
            <div class="title">{{ Math.floor(card.cap / card.price) }} BNB</div>
            <div class="finshed">
              <span :class="[{ start: card.status == 1, finshed: card.status == 2, waiting: card.status == 0 }]">{{
                status[card.status]
              }}</span>
              <Time
                class="duration"
                :endTime="card.endTime * 1000"
                :startTime="card.currentTime * 1000"
                :changeTime="changeTime"
              />
            </div>
            <div class="progress-title">Swap Progress</div>
            <el-progress
              :stroke-width="12"
              :percentage="Math.floor((card.sold / card.cap) * 100)"
              status="success"
              :show-text="false"
              color="#ffc107"
            ></el-progress>
            <div class="flex percen">
              <span>{{ Math.floor((card.sold / card.cap) * 100) }}%</span
              ><span>{{ card.sold }}/{{ card.cap }} FORK</span>
            </div>
          </van-skeleton>
        </div>
        <div class="btn-group">
          <div class="btn disable" v-click1="join">JOIN POOL</div>
          <div class="btn default">
            <a :href="`https://bscscan.com/address/${contracts.MoonFund.address}`" target="_blank">View BSC</a>
          </div>
        </div>
        <div
          class="pool-card tabs"
          v-loading="loading"
          element-loading-text="Sorry, you are not eligable for this project  since you are not involved in the whitelist."
          element-loading-spinner="none"
          element-loading-background="rgba(34,41,47,.7)"
        >
          <el-tabs v-model="tab">
            <el-tab-pane label="Fundraising Record" name="fundraising">
              <el-table
                :data="fundraisingData"
                style="width: 100%"
                class="customer-table"
                empty-text="No data temporarily"
              >
                <el-table-column prop="val" label="investment BNB Amount"> </el-table-column>
                <el-table-column prop="time" label="time" width="120"> </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="bottom">
        <h2>Pool Details</h2>
        <div class="table-box">
          <table border="0" cellspacing="0" cellpadding="0" class="pool-table" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th>Pool Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>
                    <span>Name</span><span>{{ card.title }}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <span>Token Distribution</span><span>{{ card.utcString }}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p><span>Allocation(Min)-Allocation(Max)</span><span>0-5 BNB</span></p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <span>Hard Cap</span><span>{{ Math.floor(card.cap / card.price) }} BNB</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0" cellspacing="0" cellpadding="0" class="pool-table" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th>Token Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p><span>Name</span><span>Fork Token</span></p>
                </td>
              </tr>
              <tr>
                <td>
                  <p><span>Symbol</span><span>FORK</span></p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <span>Address</span><span>{{ contracts.Fork.address }}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p><span>Total Supply</span><span>18,800,000.00</span></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <input
        id="copy"
        readonly
        type="text"
        value=""
        style="position: absolute; top: -20px; left: 0; opacity: 0; z-index: -10"
      />
      <Model
        :visable="modelVisable"
        :onOk="onOk"
        :maxVal="BNB"
        :price="card.price"
        :index="index"
        :onCanel="closeModel"
        :onClose="closeModel"
        @changeMax="changeBNB"
        ref="model"
      />
    </div>
    <div class="not-found" v-else>
      <img :src="notfound" />
      <p>你似乎来到了没有知识存在的荒原</p>
    </div>
  </div>
</template>
<script>
import Contract from '@/utils/contract';
import contracts from '@/utils/contractObj';
import Model from '@/components/Model.vue';
import Time from '@/components/Time.vue';
export default {
  name: 'Crowd',
  components: {
    Model,
    Time,
  },
  data() {
    return {
      unusual: false,
      tab: 'fundraising',
      status: ['waiting', 'starting', 'finshed'],
      modelVisable: false,
      skeletonLoading: true, // card-loading
      loading: false, // tab-loading
      contracts,
      notfound: require('@/assets/images/404.png'),
      card: {
        sold: 0,
        cap: 0,
      },
      BNB: 'NaN',
      white: false,
    };
  },
  created() {
    this.getCardInfo();
    if (this.account) {
      this.getBalance();
    }
  },
  computed: {
    fundraisingData() {
      const tableData = localStorage.getItem('fundraisingData');
      if (tableData) {
        const obj = JSON.parse(tableData);
        return obj[this.account];
      }
      return [];
    },
    account() {
      return this.$store.state.account;
    },
    chainId() {
      return this.$store.state.chainId;
    },
    index() {
      return this.$route.params.index;
    },
  },
  watch: {
    account(v) {
      if (v) {
        if (this.chainId == 56 || this.chainId == 97) {
          this.getBalance();
        }
      }
    },
    chainId(v) {
      if (v == 56 || v == 97) {
        if (this.account) {
          this.getBalance();
        }
      }
    },
  },
  methods: {
    async getCurrentTime() {
      let time = await web3js.eth.getBlock('latest');
      return time.timestamp;
    },
    async getCardInfo() {
      const current = this.contracts[`MoonFund`];
      const contract = new Contract(current.abi, current.address, current.name);
      try {
        let obj = {};
        await contract.call('sellPool', Number(this.index), function(err, res) {
          if (!err) {
            res.cap = web3js.utils.fromWei(res.cap, 'ether');
            res.sold = web3js.utils.fromWei(res.sold, 'ether');
            obj = res;
          }
        });
        obj.currentTime = await this.getCurrentTime();
        if (obj.currentTime <= obj.startTime) {
          obj.timestamp = 0;
          obj.status = 0;
        } else if (obj.endTime <= obj.currentTime) {
          obj.timestamp = 0;
          obj.status = 2;
        } else {
          obj.timestamp = (obj.endTime - obj.currentTime) * 1000;
          obj.status = 1;
        }
        obj.utcString = new Date(obj.startTime * 1000).toUTCString();
        this.card = obj;
        this.skeletonLoading = false;
      } catch {
        console.log('error');
      }
    },
    // get rem
    async getBalance() {
      // need whitelist
      const that = this;
      const current = this.contracts[`MoonFund`];
      const contract = new Contract(current.abi, current.address, current.name);
      try {
        await contract.call('whitelist', [this.index, this.account], { from: this.account }, function(err, res) {
          if (!err) {
            if (res != 0) {
              that.white = true;
              that.loading = false;
            } else {
              that.white = false;
              that.loading = true;
            }
          }
        });
        if (that.white) {
          await contract.call('userPendingQuata', [this.index, this.account], { from: this.account }, function(
            err,
            res,
          ) {
            if (!err) {
              that.BNB = Number(web3js.utils.fromWei(res, 'ether'));
            }
          });
        } else {
          that.BNB = 'N/A';
        }
      } catch {
        console.log('error');
      }
    },
    join() {
      if (this.card.status !== 1) {
        return false;
      }
      if (!this.white) {
        this.$message({
          message: 'you are not in the whitelist',
          type: 'error',
          duration: 2000,
        });
        return false;
      }
      this.modelVisable = true;
    },
    copy() {
      const inputElement = document.getElementById('copy');
      inputElement.value = this.account;
      inputElement.select();
      document.execCommand('Copy');
      this.$message({
        message: 'copy successed!',
        type: 'success',
        duration: 2000,
      });
    },
    changeTime(time) {
      this.card.timestamp = Number(time);
      if (this.card.timestamp < 1000) {
        this.card.status = 2;
      }
    },
    modelChange() {
      this.modelVisable = !this.modelVisable;
    },
    closeModel() {
      this.modelVisable = false;
    },
    changeBNB(val) {
      this.BNB = val;
    },
    onOk() {
      this.modelVisable = false;
    },
  },
};
</script>
<style lang="less" scoped>
.duration {
  font-size: 14px;
  margin-left: 10px;
}
.crowd-wrap {
  width: 100%;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.crowd {
  width: 100%;
  text-align: center;
}
.top {
  max-width: 1024px;
  margin: 0 auto;
  h2 {
    font-size: 50px;
    font-weight: 600;
    color: #22292f;
    line-height: 50px;
    margin-top: 100px;
  }
  p {
    font-size: 24px;
    font-weight: 700;
    color: #17adff;
    line-height: 36px;
    margin: 16px 0;
  }
}
.middle {
  padding: 40px 0;
}
.pool-card {
  padding: 30px 50px 40px;
  margin: 0 auto;
  width: 640px;
  min-height: 300px;
  background: #5bacd9;
  border-radius: 10px;
  color: #fff;
  text-align: left;
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .title {
    text-align: left;
    font-size: 20px;
    margin-top: 10px;
  }
  .finshed {
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 10px;
    color: #ffeb3b;
  }
  .progress-title {
    margin-bottom: 30px;
  }
  .percen {
    margin-top: 20px;
  }
}
.btn-group {
  margin: 30px;
  .btn {
    width: 128px;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    line-height: 48px;
    border-radius: 24px;
    display: inline-block;
    cursor: pointer;
    color: #22292f;
  }
  .disable {
    color: #fff;
    background: #999;
    box-shadow: 0 4px 20px 0 rgba(153, 153, 153, 30%);
  }
  .default {
    background: #f2f0eb;
    margin-left: 30px;
  }
}
.tabs {
  background: #f2f0eb;
}
.bottom {
  max-width: 1024px;
  margin: 0 auto;
  h2 {
    font-size: 40px;
    font-weight: 600;
    color: #3f9eff;
  }
}
.table-box {
  margin: 40px auto 0;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  border-radius: 5px;
  padding-bottom: 176px;
  .pool-table {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ebe9e3;
  }
  .pool-table:last-child {
    border-left: none;
  }
  .pool-table tr {
    height: 60px;
    border-bottom: 1px solid #ebe9e3;
    padding: 0 30px 0 50px;
  }
  .pool-table p {
    display: flex;
    justify-content: space-between;
    margin: 0;
  }
  .pool-table tr th {
    font-size: 14px;
    font-weight: 700;
    color: #22292f;
    line-height: 60px;
    text-align: left;
    padding: 0 30px 0 50px;
  }
  .pool-table tr td {
    font-size: 14px;
    color: #7a7f82;
    line-height: 60px;
    padding: 0 30px 0 50px;
  }
}

.not-found {
  text-align: center;
  p {
    margin: 20px;
    font-size: 18px;
  }
}
@media (max-width: 991px) {
}
@media (max-width: 767px) {
  .crowd {
    padding: 0 10px;
  }
  .top {
    h2 {
      font-size: 30px;
    }
    p {
      font-size: 14px;
      line-height: 18px;
    }
  }
  .tag {
    width: 100%;
    white-space: break-spaces;
    height: auto;
  }
  .pool-card {
    padding: 30px 10px 40px;
    width: 100%;
    .flex,
    .progress-title {
      font-size: 14px;
    }
    .title,
    .finshed {
      font-size: 18px;
    }
  }
  .btn-group {
    .btn {
      width: 120px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
    }
  }
  .bottom h2 {
    font-size: 24px;
  }
  .table-box {
    flex-direction: column;
  }
  .table-box .pool-table:last-child {
    border-left: 1px solid #ebe9e3;
    margin-top: 20px;
  }
  .table-box .pool-table tr td,
  .table-box .pool-table tr th,
  .table-box .pool-table tr {
    padding: 0 16px;
    font-size: 13px;
  }
  .table-box .pool-table tr td span:last-child {
    text-align: right;
    color: #22292f;
  }
  .not-found {
    p {
      font-size: 14px;
    }
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
