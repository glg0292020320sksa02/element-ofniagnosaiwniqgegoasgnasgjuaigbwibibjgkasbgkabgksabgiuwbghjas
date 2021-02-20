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
  USD: {
    name: 'USD',
    value: 'USD',
    icon: 'icon-usd',
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
    unit: 'VND',
  },
  TCB: {
    name: 'Techcombank',
    value: 'TCB',
    component: 'icon-tcb',
    icon: 'techcom-bank.png',
    accept: ['SELL'],
    symbol: 'VND',
    filterBy: ['VND'],
    unit: 'VND',
  },
  VNDS: {
    name: 'VNDS',
    value: 'VNDS',
    component: 'icon-vnds',
    icon: 'vnds.png',
    accept: ['BUY', 'SELL'],
    symbol: 'VNDS',
    filterBy: ['VND'],
    unit: 'VNDS',
  },
  PM: {
    name: 'PerfectMoney',
    value: 'PM',
    component: 'icon-pm',
    icon: 'pm.png',
    accept: ['SELL'],
    symbol: 'USD',
    filterBy: ['USD'],
    unit: 'PM',
  },
  USDT: {
    name: 'USDT',
    value: 'USDT',
    component: 'icon-usdt',
    icon: 'usdt.png',
    accept: ['SELL'],
    symbol: 'USDT',
    filterBy: ['USD'],
    unit: 'USDT',
  },
}

export { sides, coins, fiats, payments }
