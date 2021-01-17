const side = {
  BUY: 'BUY',
  SELL: 'SELL',
}
const sideObj = {
  BUY: { text: 'Buy', value: 'BUY' },
  SELL: { text: 'Sell', value: 'SELL' },
}
const sideRequestObj = {
  BUY: { text: 'sell', value: 'BUY', style: 'bg-error' },
  SELL: { text: 'buy', value: 'SELL', style: 'bg-success' },
}
const coin = {
  BTC: 'BTC',
  ETH: 'ETH',
  ETC: 'ETC',
  XRP: 'XRP',
  USDT: 'USDT',
  VNDS: 'VNDS',
  PM: 'PM',
}

const paymentMethods = [
  {
    name: 'Vietcombank',
    value: 'VCB',
    icon: 'vietcom-bank.png',
    component: 'icon-vcb',
    accept: 'SELL',
    symbol: 'VND',
  },
  {
    name: 'Techcombank',
    value: 'TCB',
    component: 'icon-tcb',
    icon: 'techcom-bank.png',
    accept: 'SELL',
    symbol: 'VND',
  },
  {
    name: 'VNDS',
    value: 'VNDS',
    component: 'icon-vnds',
    icon: 'vnds.png',
    accept: 'ALL',
    symbol: 'VNDS',
  },
  {
    name: 'PerfectMoney',
    value: 'PM',
    component: 'icon-pm',
    icon: 'pm.png',
    accept: 'ALL',
    symbol: 'USD',
  },
]

export { side, coin, sideObj, sideRequestObj, paymentMethods }
