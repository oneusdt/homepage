<template>
  <div class="table-con">
    <h2>Total Value Locked</h2>
    <h2 class="money">$ N/A</h2>
    <div class="content">
      <div class="list-table-box">
        <div class="list-table-header mobile-hide ">
          <table
            class="list-table list-table-head listing-table-view"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            border="0"
          >
            <tr>
              <th width="25%">Pool</th>
              <th width="25%">Current APY</th>
              <th width="25%">Tvl</th>
              <th width="25%">Belong To</th>
            </tr>
          </table>
        </div>
        <div class="list-table-body">
          <table
            class="list-table list-table-main listing-table-view"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            border="0"
          >
            <tr class="mobile-show">
              <th width="25%">Pool</th>
              <th width="25%">Current APY</th>
              <th width="25%">Tvl</th>
              <th width="25%">Belong To</th>
            </tr>
            <tr v-for="(item, index) of list" :key="index">
              <td width="25%">
                <img :src="item.pool" />
              </td>
              <td width="25%">
                <span>{{ item.apy }}</span>
              </td>
              <td width="25%">
                <span>{{ item.tvl }}</span>
              </td>
              <td width="25%">
                <span>{{ item.belong }}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tables',
  data() {
    return {
      list: [
        {
          pool: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
          apy: 'N/A',
          tvl: 'N/A',
          belong: '****',
        },
        {
          pool: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
          apy: 'N/A',
          tvl: 'N/A',
          belong: '****',
        },
        {
          pool: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
          apy: 'N/A',
          tvl: 'N/A',
          belong: '****',
        },
        {
          pool: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
          apy: 'N/A',
          tvl: 'N/A',
          belong: '****',
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.table-con {
  h2 {
    font-size: 50px;
    margin: 20px 0;
    text-align: center;
  }
  .money {
    color: #ff9800;
  }
}
.content {
  padding: 0 16px;
  margin: 0 auto;
}
table {
  border-collapse: collapse;
}
.list-table-box {
  background: #fff;
  padding: 30px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.list-table {
  table-layout: fixed;
  text-align: left;
}
.list-table-header {
  margin-bottom: 30px;
}
.list-table-header .list-table th {
  font-size: 16px;
  font-weight: 300;
}
.list-table-box td {
  font-size: 14px;
}
.list-table-main tr:not(:last-child) td {
  padding-bottom: 20px;
}
.list-table-box td,
.list-table-box th {
  text-align: center;
}
.list-table-body {
  height: auto;
  min-height: 10px;
}
td img {
  width: 30px;
  height: 30px;
}
@media (max-width: 767px) {
  .mobile-hide {
    display: none !important;
  }
  .table-con {
    h2 {
      font-size: 24px;
      margin: 10px 0;
    }
  }
  .list-table-box {
    overflow: auto;
    opacity: 1;
    flex: 1 1;
    height: auto;
    min-height: 10px;
    display: flex;
    flex-direction: column;
    opacity: 1;
  }
  .list-table-header {
    margin-bottom: 1.5rem;
  }
  .content {
    max-width: 500px;
  }
  .listing-table-view tr th:nth-child(2) {
    width: 35%;
    min-width: 100px;
  }
  .listing-table-view tr td:nth-child(3),
  .listing-table-view tr th:nth-child(3) {
    width: 45%;
  }
  .list-table-body {
    height: auto;
    flex: 1 1;
    padding-bottom: 1rem;
    overflow: auto;
  }
  .list-table tr.mobile-show th {
    padding-bottom: 20px;
  }
  .list-table {
    min-width: 500px;
  }
  .list-table-box {
    padding: 20px 15px;
  }
}

@media (min-width: 768px) {
  .mobile-show {
    display: none !important;
  }
  .content {
    max-width: 800px;
  }
}
</style>
