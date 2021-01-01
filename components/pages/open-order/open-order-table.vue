<template>
  <div class="wallet-table text-sm">
    <div class="wallet-header flex justify-between items-start text-xs p-6">
      <div class="header-column w-1/12">
        <span class="text-subtitle">{{ $t('ID') }}</span>
      </div>
      <div class="header-column w-2/12">
        <span class="text-subtitle">{{ $t('date') }}</span>
      </div>
      <div class="header-column w-1/12">
        <span class="text-subtitle">{{ $t('pair') }}</span>
      </div>
      <div class="header-column w-2/12 flex justify-center">
        <span class="text-subtitle">{{ $t('side') }}</span>
      </div>
      <div class="header-column w-2/12">
        <span class="text-subtitle">
          {{ `${$t('amountCoin')} & ${$t('price')}` }}
        </span>
      </div>
      <div class="header-column w-1/12">
        <span class="text-subtitle">{{ $t('filled') }}</span>
      </div>
      <div class="header-column w-2/12">
        <span class="text-subtitle">{{ $t('total') }}</span>
      </div>
      <div class="header-column w-1/12 flex justify-end">
        <span class="text-subtitle">{{ $t('action') }}</span>
      </div>
    </div>
    <div class="wallet-list rounded-lg">
      <div v-if="items && items.length > 0">
        <open-order-table-item
          v-for="(item, i) in items"
          :key="i + '_vorder'"
          :item="item"
          @reload="$emit('reload')"
        ></open-order-table-item>
      </div>
      <div
        v-else
        class="flex flex-col justify-center items-center p-8 text-gray-300"
      >
        <div class="p-2 rounded-full bg-primary-50 mb-1">
          <icon-empty class="w-6 h-6 text-gray-300"></icon-empty>
        </div>
        <span class="text-xs">{{ $t('orderNotFound') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { format as formatTimeago } from 'timeago.js'

import OpenOrderTableItem from '@/components/pages/open-order/open-order-table-item'
import IconEmpty from '@/components/ui/icon/icon-empty'

import { filterPrice } from '@/filters'

export default {
  name: 'WalletTable',
  filters: { filterPrice },
  components: {
    OpenOrderTableItem,
    IconEmpty,
  },
  props: {
    items: {
      type: [Object, Array],
      required: true,
    },
  },
}
</script>
