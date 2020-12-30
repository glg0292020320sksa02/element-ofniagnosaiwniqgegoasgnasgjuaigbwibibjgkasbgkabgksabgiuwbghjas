const side = {
  BUY: 'BUY',
  SELL: 'SELL',
}
const sideObj = {
  BUY: { text: 'Buy', value: 'BUY' },
  SELL: { text: 'Sell', value: 'SELL' },
}
const sideRequestObj = {
  BUY: { text: 'Sell', value: 'BUY' },
  SELL: { text: 'Buy', value: 'SELL' },
}
const coin = {
  BTC: 'BTC',
  ETH: 'ETH',
  ETC: 'ETC',
  XRP: 'XRP',
  USDT: 'USDT',
  VNDS: 'VNDS',
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
]

export { side, coin, sideObj, sideRequestObj, paymentMethods }
