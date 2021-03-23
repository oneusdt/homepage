<template>
  <div class="crowd">
    <div class="top">
      <h2>MATTER Private Pool</h2>
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
        <van-skeleton :row="6" class="m-skeleton" :loading="skeletonLoading">
          <div class="flex">
            <span>Swap Amount</span><span>have {{ sFork }} sFork</span>
          </div>
          <div class="title">{{ total }} MATTER</div>
          <div class="finshed">
            {{ status == 0 ? 'Not open' : status == 1 ? 'processing' : 'finished' }}
            <Time
              v-show="!skeletonLoading && status == 1"
              :endTime="endTime * 1000"
              :startTime="currentTime * 1000"
              :changeTime="changeTime"
            />
          </div>
          <div class="progress-title">Swap Progress</div>
          <el-progress
            :stroke-width="12"
            :percentage="percentage"
            status="success"
            :show-text="false"
            color="#ffc107"
          ></el-progress>
          <div class="flex percen">
            <span>{{ percentage }}%</span><span>{{ sold }}/{{ total }} MATTER</span>
          </div>
        </van-skeleton>
      </div>
      <div class="btn-group">
        <div class="btn disable" v-click1="join">JOIN POOL</div>
        <div class="btn default"><a href="https://bscscan.com/" target="_blank">View BSC</a></div>
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
              <el-table-column prop="time" label="time"> </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Claim" name="claim">
            <el-table :data="claimData" style="width: 100%" class="customer-table" empty-text="No data temporarily">
              <el-table-column prop="unsettled" label="Unsettled BNB"> </el-table-column>
              <el-table-column prop="obtain" label="Obtain MATTER Amount"> </el-table-column>
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
                <p><span>Token Distribution</span><span>February 27th 2021, 9:30PM SGT</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Allocation(Min)-Allocation(Max)</span><span>0-6.6 HT</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Min Swap Level</span><span>833 HT</span></p>
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
                <p><span>Token Distribution</span><span>February 27th 2021, 9:30PM SGT</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Allocation(Min)-Allocation(Max)</span><span>0-6.6 HT</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Min Swap Level</span><span>833 HT</span></p>
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
    <Model :visable="modelVisable" :onOk="onOk" :onCanel="closeModel" :onClose="closeModel" ref="model" />
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
      tab: 'fundraising',
      status: 1, // 0未进行 1进行中 2已完成
      percentage: 0,
      sFork: 0,
      total: 'N/A',
      sold: 'N/A',
      modelVisable: false,
      skeletonLoading: true,
      loading: false,
      contracts,
      startTime: 0,
      endTime: 0,
      currentTime: 0,
      timestamp: 0, //时间差
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
        return JSON.parse(tableData);
      }
      return [];
    },
    claimData() {
      const tableData = localStorage.getItem('claimData');
      if (tableData) {
        return JSON.parse(tableData);
      }
      return [];
    },
    account() {
      return this.$store.state.account;
    },
    chainId() {
      return this.$store.state.chainId;
    },
  },
  watch: {
    timestamp(newV) {
      if (newV <= 1000) {
        this.status = 2;
      }
    },
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
    async getCardInfo() {
      const that = this;
      const current = this.contracts[`MoonFund`];
      const contract = new Contract(current.abi, current.address, current.name);
      try {
        await contract.call('sforkCap', false, function(err, res) {
          if (!err) {
            that.total = web3js.utils.fromWei(res, 'ether');
          }
        });
        await contract.call('sforkSold', false, function(err, res) {
          if (!err) {
            that.sold = web3js.utils.fromWei(res, 'ether');
            that.percentage = that.sold / that.total;
          }
        });
        await contract.call('getCroTime', false, function(err, res) {
          if (!err) {
            that.startTime = res[0];
            that.endTime = res[1];
            that.currentTime = res[2];
            if (that.currentTime <= that.startTime) {
              that.timestamp = 0;
              that.status = 0;
            } else if (that.endTime <= that.currentTime) {
              that.timestamp = 0;
              that.status = 2;
            } else {
              that.timestamp = (res[1] - res[2]) * 1000;
              that.status = 1;
            }
          }
        });
        this.skeletonLoading = false;
      } catch {
        this.skeletonLoading = false;
      }
    },
    async getBalance() {
      const current = this.contracts[`sFork`];
      const contract = new Contract(current.abi, current.address, current.name);
      try {
        const res = await contract.getBalance(this.account, contract.address);
        if (res) {
            console.log(res)
          this.sFork = Number(web3js.utils.fromWei(res, 'ether'));
        }
      } catch {
        console.log('error');
      }
    },
    join() {
      if (this.status !== 1) {
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
      this.timestamp = Number(time);
    },
    modelChange() {
      this.modelVisable = !this.modelVisable;
    },
    closeModel() {
      this.modelVisable = false;
    },
    onOk() {
      this.modelVisable = false;
    },
  },
};
</script>
<style lang="less" scoped>
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
    margin-top: 30px;
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
    color: #6e895b;
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
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
