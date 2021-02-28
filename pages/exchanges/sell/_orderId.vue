<template>
  <div class="container flex justify-center items-start min-h-screen">
    <div class="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
      <el-card shadow="never" class="p-3 rounded-lg shadow-lg">
        <div
          class="card-header my-6 flex flex-col justify-center align-middle text-center"
        >
          <strong class="text-xl text-primary">
            {{ $t('sell') }} {{ selectedSellOrder.source_symbol }}
            {{ $t('to') }} {{ userSelectedSellOrder.name }}
          </strong>
          <p class="text-subtitle text-sm">{{ $t('exchangeBuyNote') }}</p>
        </div>
        <div class="p-4">
          <el-alert
            type="success"
            :closable="false"
            class="mb-12 border-l-2 border-success"
          >
            <p>
              Max volume:
              <strong>
                {{ selectedSellOrder.remaining_amount | filterPrice }}
                {{ selectedSellOrder.source_symbol }}
              </strong>
              (~
              <strong>
                {{ selectedSellOrder.remaining_total | filterPrice }}
                {{ selectedSellOrder.target_symbol }}
              </strong>
              )
            </p>
          </el-alert>
          <input-form :label="$t('price')" class="mb-6">
            <el-input
              :value="`${price} ${selectedSellOrder.target_symbol}/${selectedSellOrder.source_symbol}`"
              disabled
            ></el-input>
          </input-form>
          <input-form :label="$t('coinAmount')">
            <input-currency v-model="amount"></input-currency>
            <div class="select-amount-percent flex justify-end mt-1">
              <el-button
                v-for="percent in amountPercentList"
                :key="percent"
                round
                size="mini"
                :type="selectedPercent === percent ? 'primary' : ''"
                @click="selectAmountPercent(percent)"
              >
                {{ percent }}%
              </el-button>
            </div>
          </input-form>
          <input-form :label="$t('total')" class="mb-6">
            <el-input
              :value="`${total} ${selectedSellOrder.target_symbol}`"
              disabled
            ></el-input>
          </input-form>
          <input-form :label="$t('yourBalance')" class="mb-6">
            <el-input
              :value="`${
                currentWallet.real_balance ? currentWallet.real_balance : 0
              } ${currentWallet.currency.symbol}`"
              disabled
            ></el-input>
          </input-form>
          <div class="my-12">
            <el-button
              :loading="loading"
              type="primary"
              class="w-full"
              @click="onCreateExchange"
            >
              {{ $t('continue') }}
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Big from 'big.js'
import { mapActions, mapGetters } from 'vuex'
import { filterPrice } from '@/filters'

import InputCurrency from '@/components/ui/input-currency'
import InputForm from '@/components/common/input-form'

export default {
  name: 'ExchangesSell',
  filters: { filterPrice },
  layout: 'auth',
  components: { InputCurrency, InputForm },
  async fetch() {
    await this.getWallets()

    await this.loadDetailOrder()
  },
  data() {
    return {
      price: 0,
      amount: 0,
      selectedPercent: 100,
      remainingAmount: 0,
      loading: false,
      amountPercentList: [25, 50, 75, 100],
      selectedSellOrder: {},
    }
  },
  computed: {
    ...mapGetters({
      walletList: 'wallet/walletList',
    }),
    orderId() {
      return this.$route.params.orderId
    },
    total() {
      try {
        const price = Big(this.price)

        // Big decimal: total = this.price * this.amount
        return this.amount ? price.times(this.amount).toNumber() : 0
      } catch (error) {
        return 0
      }
    },
    currentWallet() {
      const wallet = this.walletList.find(
        item => item.currency_id === this.selectedSellOrder.wallet?.currency_id
      )

      return wallet || { currency: {} }
    },
    userSelectedSellOrder() {
      return this.selectedSellOrder.user || {}
    },
  },
  mounted() {
    this.selectAmountPercent(100)
  },
  methods: {
    ...mapActions({
      getDetailOrder: 'market/getDetailOrder',
      addExchangesSell: 'market/addExchangesSell',
      getExchangeAmount: 'market/getExchangeAmount',
      getWallets: 'wallet/getWallets',
    }),

    async loadDetailOrder() {
      const {
        price,
        remaining_amount: remainingAmount,
        ...selectedSellOrder
      } = await this.getDetailOrder(this.orderId)

      this.price = Number(price)
      this.amount = this.remainingAmount = Number(remainingAmount)
      this.selectedSellOrder = selectedSellOrder
    },

    async onCreateExchange() {
      this.$notify.closeAll()

      const body = {
        amount: this.amount.toString(),
        order_id: this.orderId,
      }

      try {
        this.loading = true
        await this.addExchangesSell(body)
        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('exchange-susscessful'),
          actionText: this.$t('pleaseReturnHomePage'),
          actionMethod: () => this.$router.push({ name: 'index' }),
        })
      } catch (e) {
        this.$notify({
          title: this.$t('failure'),
          message: e.exception,
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    async selectAmountPercent(percent) {
      this.selectedPercent = percent
      const payload = {
        order_id: this.orderId,
        percent: parseInt(this.selectedPercent) / 100,
      }
      const { amount, total } = await this.getExchangeAmount(payload)

      this.amount = amount
      this.total = total
    },
  },
}
</script>

<style>
.select-amount-percent .el-button--mini.is-round {
  padding: 4px !important;
  margin: 0;
  margin-right: 4px;
  font-size: 0.685rem;
}
</style>
