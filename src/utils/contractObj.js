import moonFundJSON from '../contract/MoonFund.json';
import WBNBJSON from '../contract/MockWBNB.json';
import ForkJSON from '../contract/Fork.json';
import sForkTokenJSON from '../contract/sForkToken.json';

export default {
  MoonFund: {
    address: '0x21D504fe1D921722813A115C1438c9c7AAA16959',
    abi: moonFundJSON,
    name: 'MoonFund',
  },
  Fork: {
    address: '0x56cadb9ef10ef7d8de22a5a49bd9c66893962e7f',
    abi: ForkJSON,
    name: 'Fork',
  },
  sFork: {
    abi: sForkTokenJSON,
    address: '0xD3493492cc51b80F5101595b6B98b7c8c146030f',
    name: 'sFork',
  },
  BNB: {
    address: '0x744FB5700D556Ec736Bc2924A2656196039937f1',
    abi: WBNBJSON,
    name: 'BNB',
  },
};
