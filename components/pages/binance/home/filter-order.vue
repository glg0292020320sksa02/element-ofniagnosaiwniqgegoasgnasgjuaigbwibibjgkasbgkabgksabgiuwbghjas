<template>
  <div class="filter-order flex flex-row justify-start">
    <filter-amount></filter-amount>
    <!-- <filter-fiat class="ml-3"></filter-fiat> -->
    <filter-payment class="ml-3"></filter-payment>
  </div>
</template>

<script>
import FilterAmount from '@/components/pages/binance/home/filter/filter-amount'
// import FilterFiat from '@/components/pages/binance/home/filter/filter-fiat'
import FilterPayment from '@/components/pages/binance/home/filter/filter-payment'

export default {
  name: 'FilterOrder',
  components: {
    FilterAmount,
    // FilterFiat,
    FilterPayment,
  },
}
</script>

<style></style>
