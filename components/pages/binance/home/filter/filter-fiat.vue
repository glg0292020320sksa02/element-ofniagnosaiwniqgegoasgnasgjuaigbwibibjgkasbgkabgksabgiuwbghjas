<template>
  <div class="filter-fiat">
    <label for="amountfilter" class="text-xs text-subtitle">
      {{ $t('Fiat') }}
    </label>
    <div class="filter-box flex flex-row justify-start">
      <div
        v-if="dialog"
        class="fixed top-0 left-0 w-screen h-screen bg-transparent"
        @click="toogleFiats"
      ></div>
      <div class="relative inline-block z-10 hover:z-10">
        <button
          type="text"
          class="border bg-transparent border-gray-300 rounded px-3 py-1 text-sm flex flex-row justify-between items-center hover:border-yellow-600"
          :placeholder="$t('EnterAmount')"
          @click="toogleFiats"
        >
          <component :is="filterOrder.fiat.icon"></component>
          <span class="text-sm ml-2 mr-4">{{ filterOrder.fiat.name }}</span>
          <icon-chevron-down
            class="w-3 h-3 font-bold text-subtitle"
          ></icon-chevron-down>
        </button>
        <div
          v-if="dialog"
          class="select-list absolute bg-white shadow rounded w-40"
        >
          <div
            v-for="(fiat, index) in fiats"
            :key="index + '_fiat'"
            class="flex flex-row justify-start flex-nowrap text-xs px-3 p-2 rounded cursor-pointer hover:bg-gray-100 whitespace-nowrap"
            @click="selectFiat(fiat)"
          >
            <component :is="fiat.icon"></component>
            <span class="ml-1 fiat-name">{{ fiat.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IconChevronDown from '@/components/ui/icon/icon-chevron-down'
import IconVnds from '@/components/ui/icon/icon-vnds'
import IconVnd from '@/components/ui/icon/icon-vnd'
import IconUsd from '@/components/ui/icon/icon-usd'
import IconPm from '@/components/ui/icon/icon-pm'
import { fiats } from '~/utils/binance'

export default {
  name: 'FilterFiat',
  components: {
    IconChevronDown,
    IconVnds,
    IconVnd,
    IconUsd,
    IconPm,
  },
  data() {
    return {
      model: {
        amount: null,
      },
      fiats: Object.values(fiats),
      dialog: false,
    }
  },
  computed: {
    ...mapGetters({ filterOrder: 'binance/filterOrder' }),
  },
  methods: {
    ...mapActions({ setFilterOrderItem: 'binance/setFilterOrderItem' }),
    toogleFiats() {
      this.dialog = !this.dialog
    },
    selectFiat(fiat) {
      this.setFilterOrderItem({ item: 'fiat', payload: fiat })
      this.toogleFiats()
    },
  },
}
</script>

<style>
.unit-filter {
  bottom: 50%;
  right: 8px;
  transform: translateY(50%);
}
.search-filter {
  left: -1px;
}
.search-filter:hover {
  z-index: 20;
}
.fiat-name {
  white-space: nowrap;
}
</style>
