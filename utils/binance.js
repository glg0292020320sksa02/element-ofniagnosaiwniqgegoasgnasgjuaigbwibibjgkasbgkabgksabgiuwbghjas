const sides = {
  BUY: {
    name: 'Buy',
    value: 'BUY',
  },
  SELL: {
    name: 'Sell',
    value: 'SELL',
  },
}
const fiats = {
  VND: {
    name: 'VND',
    value: 'VND',
    icon: 'icon-vnd',
  },
  VNDS: {
    name: 'VNDS',
    value: 'VNDS',
    icon: 'icon-vnds',
  },
  USD: {
    name: 'USD',
    value: 'USD',
    icon: 'icon-usd',
  },
  PM: {
    name: 'Perfect money',
    value: 'PM',
    icon: 'icon-pm',
  },
}
const coins = {
  BTC: {
    name: 'BTC',
    symbol: 'BTC',
    icon: '',
    side: ['BUY', 'SELL'],
  },
  ETH: {
    name: 'ETH',
    symbol: 'ETH',
    icon: '',
    side: ['BUY', 'SELL'],
  },
  ETC: {
    name: 'ETC',
    symbol: 'ETC',
    icon: '',
    side: ['BUY', 'SELL'],
  },
  XRP: {
    name: 'XRP',
    symbol: 'XRP',
    icon: '',
    side: ['BUY', 'SELL'],
  },
  USDT: {
    name: 'USDT',
    symbol: 'USDT',
    icon: '',
    side: ['BUY', 'SELL'],
  },
  VNDS: {
    name: 'VNDS',
    symbol: 'VNDS',
    icon: '',
    side: ['BUY'],
  },
  PM: {
    name: 'PM',
    symbol: 'PM',
    icon: '',
    side: ['BUY', 'SELL'],
  },
}
const payments = {
  VCB: {
    name: 'Vietcombank',
    value: 'VCB',
    icon: 'vietcom-bank.png',
    component: 'icon-vcb',
    accept: ['SELL'],
    symbol: 'VND',
    filterBy: ['VND'],
  },
  TCB: {
    name: 'Techcombank',
    value: 'TCB',
    component: 'icon-tcb',
    icon: 'techcom-bank.png',
    accept: ['SELL'],
    symbol: 'VND',
    filterBy: ['VND'],
  },
  VNDS: {
    name: 'VNDS',
    value: 'VNDS',
    component: 'icon-vnds',
    icon: 'vnds.png',
    accept: ['BUY', 'SELL'],
    symbol: 'VNDS',
    filterBy: [],
  },
  PM: {
    name: 'PerfectMoney',
    value: 'PM',
    component: 'icon-pm',
    icon: 'pm.png',
    accept: ['SELL'],
    symbol: 'USD',
    filterBy: [],
  },
}

export { sides, coins, fiats, payments }
