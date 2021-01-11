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
    accept: 'SELL',
  },
  {
    name: 'Techcombank',
    value: 'TCB',
    icon: 'techcom-bank.png',
    accept: 'SELL',
  },
  { name: 'VNDS', value: 'VNDS', icon: 'vnds.png', accept: 'ALL' },
  { name: 'PerfectMoney', value: 'PM', icon: 'pm.png', accept: 'ALL' },
]

export { side, coin, sideObj, sideRequestObj, paymentMethods }
