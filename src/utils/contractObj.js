import moonFundJSON from '../contract/MoonFund.json';
import WBNBJSON from '../contract/MockWBNB.json';
import ForkJSON from '../contract/Fork.json';

const EXPLORER_URLS = {
  1: 'https://etherscan.io/address',
  3: 'https://ropsten.etherscan.io/address',
  4: 'https://rinkeby.etherscan.io/address',
  5: 'https://goerli.etherscan.io/address',
  42: 'https://kovan.etherscan.io/address',
  56: 'https://bscscan.com/address',
  97: 'https://testnet.bscscan.com/address',
  128: 'https://hecoinfo.com/address',
  250: 'https://ftmscan.com/address',
  256: 'https://testnet.hecoinfo.com/address',
};

const networkId = process.env.VUE_APP_NETWORK_ID;

export default {
  MoonFund: {
    address: process.env.VUE_APP_CONTRACT_MOON_FOUND,
    abi: moonFundJSON,
    name: 'MoonFund',
    explorerUrl: `${EXPLORER_URLS[networkId]}/${process.env.VUE_APP_CONTRACT_MOON_FOUND}`,
  },
  Fork: {
    address: process.env.VUE_APP_CONTRACT_FORK,
    abi: ForkJSON,
    name: 'Fork',
    explorerUrl: `${EXPLORER_URLS[networkId]}/${process.env.VUE_APP_CONTRACT_FORK}`,
  },
  BNB: {
    address: process.env.VUE_APP_CONTRACT_BNB,
    abi: WBNBJSON,
    name: 'BNB',
    explorerUrl: `${EXPLORER_URLS[networkId]}/${process.env.VUE_APP_CONTRACT_BNB}`,
  },
};
