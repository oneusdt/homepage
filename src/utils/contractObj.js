import moonFundJSON from '../contract/MoonFund.json';
import WBNBJSON from '../contract/MockWBNB.json';
import sForkTokenJSON from '../contract/sForkToken.json';

export default {
  MoonFund: {
    address: '0x1Fe0d492446Fe6f481911aaC29957C0F2ec2091F',
    abi: moonFundJSON,
    name: 'MoonFund',
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
