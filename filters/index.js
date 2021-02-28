import numeral from 'numeral'
import { Decimal } from 'decimal.js'

if (process.client) {
  numeral.register('locale', 'custom', {
    delimiters: {
      thousands: ',',
      decimal: '.',
    },
    abbreviations: {
      thousand: 'K',
      million: 'M',
      billion: 'B',
      trillion: 'T',
    },
    currency: {
      symbol: '€',
    },
  })

  numeral.locale('custom')
}

const filterPercent = function (value) {
  const number = Number(value) || 0

  const percent = numeral(number).format('0.00')

  return percent > 0 ? `+${percent}%` : `${percent}%`
}

const filterPrice = function (value) {
  const number = Number(value) || 0

  return numeral(number).format('0,0.[00000000]')
}
const filterPriceFloat = function (value) {
  const number = Number(value) || 0

  return numeral(number).format('0,0.00000000')
}

const filterPriceFloatDecimal = function (value) {
  const number = Number(value) || 0

  if (new Decimal(value).eq(new Decimal(0))) {
    return 0
  }

  const decimalNumber = new Decimal(value)

  const arrNumber = decimalNumber.toFixed(8).split('.')

  return `${numeral(arrNumber[0]).format('0,0.[00000000]')}.${
    arrNumber[1] || '00000000'
  }`
}

const filterPriceMoney = function (value) {
  const number = Number(value) || 0

  return numeral(number).format('0,0.[]')
}

const filterPriceString = function (value) {
  const numberString =
    value.toString().lastIndexOf('.') === -1 ||
    value.toString().length < value.toString().lastIndexOf('.') + 7
      ? value
      : value.substring(0, value.lastIndexOf('.') + 7)

  return numberString
}

const filterMarketCap = function (value) {
  const number = Number(value) || 0

  return numeral(number).format('0.00a')
}

export {
  filterPercent,
  filterPrice,
  filterMarketCap,
  filterPriceString,
  filterPriceMoney,
  filterPriceFloat,
  filterPriceFloatDecimal,
}
