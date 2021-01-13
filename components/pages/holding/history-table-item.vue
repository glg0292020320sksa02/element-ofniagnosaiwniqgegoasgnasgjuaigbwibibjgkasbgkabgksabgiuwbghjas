<template>
  <div
    class="order-item border-b bg-white border-b-gray-200 transform transition-all duration-75 ease-in-out"
    :class="{ 'my-4 shadow-xl overflow-hidden border': isExpand }"
  >
    <div
      class="flex flex-row justify-between items-stretch p-6 cursor-pointer"
      @click.stop="selectHistory(item)"
    >
      <div class="order-column w-2/12 flex items-center">
        <div class="flex flex-row justify-start items-center">
          <span class="text-sm text-primary">{{ item.updated_at }}</span>
        </div>
      </div>
      <div class="order-column w-2/12 flex items-center">
        <div class="flex flex-row justify-start items-start">
          <strong>{{ sourceSymbol(item.source_symbol) }}</strong>
        </div>
      </div>
      <div class="order-column w-2/12 flex justify-end items-center">
        <div class="flex flex-row justify-end items-baseline">
          <div class="flex justify-start items-center">
            <strong>{{ item.amount | filterPrice }}</strong>
          </div>
        </div>
      </div>
      <div class="order-column w-2/12 flex justify-end items-center">
        <div class="flex flex-row justify-end items-baseline">
          <strong
            class="rounded-full py-1 px-2 text-xs"
            :class="{
              'text-success bg-primary-100': item.status === 'COMPLETED',
              'text-warning bg-warning-200': item.status === 'PENDING',
            }"
          >
            {{ item.status }}
          </strong>
        </div>
      </div>
      <div class="order-column w-4/12 flex flex-row justify-end items-center">
        <div class="flex flex-row justify-end items-center">
          <div class="flex justify-start items-center">
            <strong>{{ item.fee | filterPrice }}</strong>
            <span class="ml-1 text-xs text-subtitle">
              {{ targetSymbol(item.target_symbol) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isExpand" class="expand border-t bg-gray-100 flex justify-start">
      <div class="px-6">
        <table>
          <tbody>
            <tr class="border-b">
              <td class="py-4">
                <strong class="mr-1">{{ $t('txId') }}:</strong>
              </td>
              <td>
                <a
                  :href="item.txn_url"
                  target="_blank"
                  class="uppercase text-xs text-primary underline"
                >
                  {{ item.txn_id }}
                </a>
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-4">
                <strong class="mr-1">{{ $t('status') }}:</strong>
              </td>
              <td>
                <strong
                  class="rounded-full py-1 px-2 text-xs"
                  :class="{
                    'text-success bg-primary-100': item.status === 'COMPLETED',
                    'text-warning bg-warning-200': item.status === 'PENDING',
                  }"
                >
                  {{ item.status }}
                </strong>
              </td>
            </tr>
            <tr class="border-b">
              <td class="py-4">
                <strong class="mr-1">{{ $t('FromAddress') }}:</strong>
              </td>
              <td>{{ item.from_wallet_id }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-4">
                <strong class="mr-1">{{ $t('ToAddress') }}:</strong>
              </td>
              <td>{{ item.to_wallet_id }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-4">
                <strong class="mr-1">{{ $t('date') }}:</strong>
              </td>
              <td>{{ item.updated_at }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-4">
                <strong class="mr-1">{{ $t('symbol') }}:</strong>
              </td>
              <td>{{ sourceSymbol(item.source_symbol) }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-4">
                <strong class="mr-1">{{ $t('quantity') }}:</strong>
              </td>
              <td>{{ item.amount }}</td>
            </tr>
            <tr>
              <td class="py-4">
                <strong class="mr-1">{{ $t('Confirmation') }}:</strong>
              </td>
              <td>{{ item.confirmations }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { filterPrice } from '@/filters'
export default {
  name: 'DepositHistory',
  filters: { filterPrice },
  props: {
    item: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      listTransactions: [],
      transTotal: 0,
    }
  },
  computed: {
    ...mapGetters({
      selectedHistory: 'wallet/selectedHistory',
    }),
    isExpand() {
      return this.selectedHistory?.id === this.item?.id
    },
  },
  methods: {
    ...mapActions({
      getAllOrderTransactions: 'market/getAllOrderTransactions',
      setSelectedHistory: 'wallet/setSelectedHistory',
    }),
    selectHistory(payload) {
      if (this.isExpand) {
        this.setSelectedHistory(null)

        return
      }

      this.setSelectedHistory(payload)
    },
    getColorSide(side) {
      return side.toLowerCase() === 'buy' ? 'text-success' : 'text-error'
    },
    sourceSymbol(source_symbol) {
      return source_symbol || ''
    },
    targetSymbol(target_symbol) {
      return target_symbol || ''
    },
    getColorTotal(total) {
      return Number(total) > 0 ? 'text-success' : 'text-error'
    },
    amountAbsolute(amount) {
      const amountCal = Number(amount) || 0

      return Math.abs(amountCal)
    },
    selectRow(row) {
      this.$refs.openOrder.toggleRowExpansion(row, true)
    },
  },
}
</script>

<style></style>
