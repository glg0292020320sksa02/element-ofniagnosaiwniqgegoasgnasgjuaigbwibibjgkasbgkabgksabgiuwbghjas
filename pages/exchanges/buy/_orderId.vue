<template>
  <div
    class="exchanges-buy container flex justify-center items-start min-h-screen"
  >
    <div class="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
      <el-card shadow="never">
        <div
          class="card-header my-6 flex flex-col justify-center align-middle text-center"
        >
          <strong class="text-xl text-primary">
            {{ $t('buy') }} {{ selectedBuyOrder.source_symbol }}
            {{ $t('from') }} {{ userSelectedBuyOrder.name }}
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
                {{ selectedBuyOrder.remaining_amount | filterPrice }}
                {{ selectedBuyOrder.source_symbol }}
              </strong>
              (~
              <strong>
                {{ selectedBuyOrder.remaining_total | filterPrice }}
                {{ selectedBuyOrder.target_symbol }}
              </strong>
              )
            </p>
          </el-alert>
          <input-form :label="$t('payment_method')" class="mb-6">
            <div class="flex flex-col space-y-2 mt-2 px-2">
              <el-radio v-model="payment_method" label="VCB">
                <div class="inline-block">
                  <div class="flex space-x-4">
                    <span>Vietcombank</span>
                    <img
                      class="w-4"
                      src="~/assets/images/banks/vietcom-bank.png"
                    />
                  </div>
                </div>
              </el-radio>
              <el-radio v-model="payment_method" label="TCB">
                <div class="inline-block">
                  <div class="flex space-x-4">
                    <span>Techcombank</span>
                    <img
                      class="w-4"
                      src="~/assets/images/banks/techcom-bank.png"
                    />
                  </div>
                </div>
              </el-radio>
              <el-radio v-model="payment_method" label="VNDS">
                <div class="inline-block">
                  <div class="flex space-x-4">
                    <span>VNDS</span>
                    <img class="w-4" src="~/assets/images/banks/vnds.png" />
                  </div>
                </div>
              </el-radio>
              <el-radio v-model="payment_method" label="ALL_BANK">
                <div class="inline-block">
                  <div class="flex space-x-4">
                    <span>{{ $t('all-bank') }}</span>
                    <img class="w-4" src="~/assets/images/banks/all-bank.png" />
                  </div>
                </div>
              </el-radio>
            </div>
          </input-form>
          <input-form :label="$t('price')" class="mb-6">
            <input-currency v-model="price" disabled></input-currency>
          </input-form>
          <input-form :label="$t('amountCoin')">
            <input-currency v-model="amount"></input-currency>
            <div class="flex justify-end">
              <select-amount-percent
                v-model="amount"
                :total="remainingAmount"
                class="mt-2"
              ></select-amount-percent>
            </div>
          </input-form>
          <input-form :label="$t('total')" class="mb-6">
            <input-currency v-model="total" disabled></input-currency>
          </input-form>
          <input-form
            v-if="payment_method === 'VNDS'"
            :label="$t('yourVNDSBalance')"
            class="mb-6"
          >
            <input-currency
              :value="VNDS.real_balance"
              disabled
            ></input-currency>
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

import SelectAmountPercent from '@/components/common/select-amount-percent'
import InputCurrency from '@/components/ui/input-currency'
import InputForm from '@/components/common/input-form'

export default {
  name: 'ExchangesBuy',
  filters: { filterPrice },
  layout: 'auth',
  components: { SelectAmountPercent, InputCurrency, InputForm },
  async fetch() {
    await this.loadWallets()
    await this.loadDetailOrder()
  },
  data() {
    return {
      payment_method: 'VCB',
      price: 0,
      remainingAmount: 0,
      amount: 0,
      yourCurrency: 0,
      loading: false,
      selectedBuyOrder: {},
    }
  },
  computed: {
    ...mapGetters({
      walletList: 'wallet/walletList',
      VNDS: 'wallet/VNDS',
    }),
    orderId() {
      return this.$route.params.orderId
    },
    total() {
      const price = Big(this.price)

      // Big decimal: total = this.price * this.amount
      return this.amount ? price.times(this.amount).toNumber() : 0
    },
    userSelectedBuyOrder() {
      return this.selectedBuyOrder.user || {}
    },
  },

  created() {
    this.initPaymentMethod()
  },

  methods: {
    ...mapActions({
      getWallets: 'wallet/getWallets',
      getDetailOrder: 'market/getDetailOrder',
      addExchangesBuy: 'market/addExchangesBuy',
    }),

    initPaymentMethod() {
      this.payment_method = this.$route.query.payment_method || 'VCB'
    },

    loadWallets() {
      if (!this.walletList.length) {
        return this.getWallets()
      }
    },

    async loadDetailOrder() {
      const {
        price,
        remaining_amount: remainingAmount,
        ...selectedBuyOrder
      } = await this.getDetailOrder(this.orderId)

      this.price = Number(price)
      this.amount = this.remainingAmount = Number(remainingAmount)
      this.selectedBuyOrder = selectedBuyOrder
    },

    async onCreateExchange() {
      this.$notify.closeAll()

      const body = {
        payment_method: this.payment_method,
        amount: this.amount.toString(),
        order_id: this.orderId,
      }

      try {
        this.loading = true
        const { payment_url: paymentUrl } = await this.addExchangesBuy(body)

        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('exchange-susscessful'),
          actionText: this.$t('pleaseRedirectToPaymentPage'),
          actionMethod: () => window.open(paymentUrl),
        })

        this.$router.push({ name: 'index' })
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
  },
}
</script>
