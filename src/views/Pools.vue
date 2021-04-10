<template>
  <div class="pools">
    <el-row>
      <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) of list" :key="index">
        <el-card class="box-card">
          <div class="flex">
            <div class="name">
              <img :src="item.logoUrl" />
              <span>{{ item.title }}</span>
            </div>
            <div class="time">
              <span :class="[{ start: item.status == 1, finshed: item.status == 2, waiting: item.status == 0 }]">{{
                status[item.status]
              }}</span>
              <Time
                v-if="item.timestamp >= 1000"
                :endTime="item.endTime * 1000"
                :startTime="item.currentTime * 1000"
                :changeTime="time => changeTime(time, item, 'start')"
              />
              <Time
                v-if="item.timestamp1 >= 1000"
                :endTime="item.startTime * 1000"
                :startTime="item.currentTime * 1000"
                :changeTime="time => changeTime(time, item, 'wait')"
              />
            </div>
          </div>
          <div class="flex info">
            <span>Ratio</span>
            <span>Total funds will be raised</span>
          </div>
          <div class="flex price">
            <span>1BNB={{ item.price }}FORK</span>
            <span>{{ Math.floor(item.cap / item.price) }}BNB</span>
          </div>
          <div class="progress-title">Progress</div>
          <el-progress
            :stroke-width="8"
            :percentage="Math.floor((item.sold / item.cap) * 100)"
            status="success"
            :show-text="false"
            color="#ffc107"
          ></el-progress>
          <span class="percent">{{ Math.floor((item.sold / item.cap) * 100) }}%</span>
          <div class="flex access">
            <span>Access Type</span>
            <span>
              <span class="public-icon"></span> <span>{{ item.isPrivate ? 'Private' : 'Public' }}</span></span
            >
          </div>
          <el-button :type="item.status == 2 ? 'info' : 'primary'" class="enter-btn" round @click="linkTo(index)"
            >Enter POOL</el-button
          >
        </el-card>
      </el-col>
      <!-- demo data -->
      <el-col :xs="24" :sm="12" :md="8" v-if="poolLength < 1">
        <el-card class="box-card">
          <div class="flex">
            <div class="name">
              <img src="https://i.loli.net/2021/03/31/jg1DsxikGhovKX3.png" />
              <span>Seed funding</span>
            </div>
            <div>
              <span class="finshed">waiting</span>
            </div>
          </div>
          <div class="flex info">
            <span>Ratio</span>
            <span>Total funds will be raised</span>
          </div>
          <div class="flex price">
            <span>1BNB=752FORK</span>
            <span>100BNB</span>
          </div>
          <div class="progress-title">Progress</div>
          <el-progress
            :stroke-width="8"
            :percentage="0"
            status="success"
            :show-text="false"
            color="#ffc107"
          ></el-progress>
          <span class="percent">0%</span>
          <div class="flex access">
            <span>Access Type</span>
            <span>
              <span class="public-icon"></span>
              <span>Private</span>
            </span>
          </div>
          <el-button type="info" :disabled="true" class="enter-btn" round>Enter POOL</el-button>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" v-if="poolLength < 2">
        <el-card class="box-card">
          <div class="flex">
            <div class="name">
              <img src="https://i.loli.net/2021/03/31/4nPEu79sLRGcMTK.png" />
              <span>Whitelisted Sale</span>
            </div>
            <div>
              <span class="finshed">waiting</span>
            </div>
          </div>
          <div class="flex info">
            <span>Ratio</span>
            <span>Total funds will be raised</span>
          </div>
          <div class="flex price">
            <span>1BNB=376FORK</span>
            <span>1000BNB</span>
          </div>
          <div class="progress-title">Progress</div>
          <el-progress
            :stroke-width="8"
            :percentage="0"
            status="success"
            :show-text="false"
            color="#ffc107"
          ></el-progress>
          <span class="percent">0%</span>
          <div class="flex access">
            <span>Access Type</span>
            <span>
              <span class="public-icon"></span>
              <span>Private</span>
            </span>
          </div>
          <el-button type="info" :disabled="true" class="enter-btn" round>Enter POOL</el-button>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" v-if="poolLength < 3">
        <el-card class="box-card">
          <div class="flex">
            <div class="name">
              <img src="https://i.loli.net/2021/03/31/59Hcs4D2rZEWXdf.png" />
              <span>Public offering</span>
            </div>
            <div>
              <span class="finshed">waiting</span>
            </div>
          </div>
          <div class="flex info">
            <span>Ratio</span>
            <span>Total funds will be raised</span>
          </div>
          <div class="flex price">
            <span>1BNB=225FORK</span>
            <span>1000BNB</span>
          </div>
          <div class="progress-title">Progress</div>
          <el-progress
            :stroke-width="8"
            :percentage="0"
            status="success"
            :show-text="false"
            color="#ffc107"
          ></el-progress>
          <span class="percent">0%</span>
          <div class="flex access">
            <span>Access Type</span>
            <span>
              <span class="public-icon"></span>
              <span>Public</span>
            </span>
          </div>
          <el-button type="info" :disabled="true" class="enter-btn" round>Enter POOL</el-button>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" v-if="poolLength < 4">
        <el-card class="box-card">
          <div class="flex">
            <div class="name">
              <img src="https://i.loli.net/2021/03/31/pxon951AeVgfJIk.png" />
              <span>Rug pull victim</span>
            </div>
            <div>
              <span class="finshed">waiting</span>
            </div>
          </div>
          <div class="flex info">
            <span>Ratio</span>
            <span>Total funds will be raised</span>
          </div>
          <div class="flex price">
            <span>1BNB=75200FORK</span>
            <span>1BNB</span>
          </div>
          <div class="progress-title">Progress</div>
          <el-progress
            :stroke-width="8"
            :percentage="0"
            status="success"
            :show-text="false"
            color="#ffc107"
          ></el-progress>
          <span class="percent">0%</span>
          <div class="flex access">
            <span>Access Type</span>
            <span>
              <span class="public-icon"></span>
              <span>Private</span>
            </span>
          </div>
          <el-button type="info" :disabled="true" class="enter-btn" round>Enter POOL</el-button>
        </el-card>
      </el-col>
      <!-- comming soon -->
      <el-col :xs="24" :sm="12" :md="8">
        <el-card class="box-card bg-card">
          <p>Coming Soon</p>
          <div class="progress-title">Progress</div>
          <el-progress
            :stroke-width="8"
            :percentage="0"
            status="success"
            :show-text="false"
            color="#ffc107"
          ></el-progress>
          <span class="percent">0%</span>
          <el-button type="info" :disabled="true" class="enter-btn comming-btn" round>Enter POOL</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Time from '@/components/Time.vue';
import Contract from '@/utils/contract';
import contracts from '@/utils/contractObj';
export default {
  name: 'Pools',
  components: {
    Time,
  },
  data() {
    return {
      contracts,
      poolLength: 0,
      list: [],
      status: ['waiting', 'starting', 'finshed'],
    };
  },
  watch: {
    chainIdError(status) {
      if (status) {
        this.list = [];
      } else {
        this.$store.commit('setLoadingState', true);
        this.getPools();
      }
    },
  },
  created() {
    this.$store.commit('setLoadingState', true);
    this.getPools();
  },
  methods: {
    linkTo(index) {
      this.$router.push({ path: `/pools/${index}` });
    },
    async getCurrentTime() {
      let time = await web3js.eth.getBlock('latest');
      return time.timestamp;
    },
    async getPools() {
      const that = this;
      const current = this.contracts[`MoonFund`];
      const contract = new Contract(current.abi, current.address, current.name);
      try {
        await contract.call('sellPoolLength', false, function(err, res) {
          if (!err) {
            that.poolLength = res;
          }
        });
      } catch {
        console.log('error');
      }
      let arr = [];
      for (let i = 0; i < this.poolLength; i++) {
        await contract.call('sellPool', i, function(err, res) {
          if (!err) {
            res.cap = web3js.utils.fromWei(res.cap, 'ether');
            res.sold = web3js.utils.fromWei(res.sold, 'ether');
            arr.push(res);
          }
        });
      }
      const currentTime = await this.getCurrentTime();
      const logoList = [
        'https://i.loli.net/2021/03/31/jg1DsxikGhovKX3.png',
        'https://i.loli.net/2021/03/31/4nPEu79sLRGcMTK.png',
        'https://i.loli.net/2021/03/31/59Hcs4D2rZEWXdf.png',
        'https://i.loli.net/2021/03/31/pxon951AeVgfJIk.png',
      ];
      //timestamp1 means Not started time
      arr = arr.map((item, index) => {
        item.currentTime = currentTime;
        item.logoUrl = logoList[index];
        if (item.currentTime <= item.startTime) {
          item.timestamp = 0;
          item.timestamp1 = Math.abs(item.startTime - item.currentTime) * 1000;
          item.status = 0;
        } else if (item.endTime <= item.currentTime) {
          item.timestamp = 0;
          item.timestamp1 = 0;
          item.status = 2;
        } else {
          item.timestamp = (item.endTime - item.currentTime) * 1000;
          item.timestamp1 = 0;
          item.status = 1;
        }
        // sold == cap
        if (item.cap == item.sold) {
          item.timestamp = 0;
          item.timestamp1 = 0;
          item.status = 2;
        }
        return item;
      });
      this.list = arr;
      this.$store.commit('setLoadingState', false);
    },
    changeTime(time, item, type) {
      // 0 waiting 1start 2finshed
      if (type == 'start') {
        item.timestamp = time;
        if (item.timestamp < 1000) {
          item.status = 2;
        }
      } else {
        item.timestamp1 = time;
        if (item.timestamp1 < 1000) {
          item.status = 1;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.pools {
  width: 100%;
  padding: 0 16px 32px;
  min-height: calc(100vh - 200px);
  max-width: 1080px;
  margin: 0 auto;
}
.bg-card {
  background: #f8fbff;
}
.box-card {
  width: 320px;
  margin: 0 auto;
  margin-top: 20px;
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  .name {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #22292f;
    flex: 1;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }
  .info {
    font-weight: bold;
    margin-top: 10px;
  }
  .price {
    font-size: 12px;
  }
  .progress-title {
    margin-top: 24px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  .access {
    font-size: 16px;
    margin: 20px 0;
    > span:first-child {
      color: rgb(122, 127, 130);
    }
    > span:last-child {
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .percent {
    margin-top: 4px;
    display: inline-block;
    font-size: 13px;
  }
  .status {
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
    transform: scale(0.9);
    display: block;
  }
  .wait {
    color: #fff;
    background: #607d8b;
    .status;
  }
  .finshed {
    color: #fff;
    background: #607d8b;
    .status;
  }
  .start {
    background: #03a9f4;
    color: #fff;
    .status;
  }
  p {
    font-size: 30px;
    color: #409eff;
    margin: 40px 0 40px;
    text-align: center;
  }
}
.public-icon {
  width: 20px;
  height: 20px;
  background: url('../assets/images/public.png') no-repeat;
  background-size: 100% 100%;
  margin-right: 4px;
}
.enter-btn {
  width: 100%;
  margin-bottom: 10px;
}
.comming-btn {
  margin-top: 62px;
}
@media (max-width: 991px) {
}
@media (max-width: 767px) {
  .box-card {
    width: 100%;
  }
}
@media (min-width: 992px) {
}
@media (min-width: 1200px) {
}
</style>
