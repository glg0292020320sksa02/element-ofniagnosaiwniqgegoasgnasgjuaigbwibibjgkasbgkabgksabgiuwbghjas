<template>
  <div class="filter-amount">
    <label for="amountfilter" class="text-xs text-subtitle">
      {{ $t('Amount') }}
    </label>
    <div class="filter-box flex flex-row justify-start">
      <div class="relative inline-block z-10 hover:z-10">
        <input
          v-model="model.amount"
          type="text"
          class="border bg-transparent border-gray-300 rounded-l px-3 py-1 text-sm hover:border-yellow-600"
          :placeholder="$t('EnterAmount')"
          @change="
            setFilterOrderItem({ item: 'amount', payload: model.amount })
          "
        />
        <span class="unit-filter text-sm text-subtitle absolute">
          {{ filterOrder.fiat.name }}
        </span>
      </div>
      <button
        class="search-filter text-sm font-bold px-3 py-1 rounded-r border relative bg-transparent border-gray-300 text-yellow-600 hover:border-yellow-600"
      >
        {{ $t('Search') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FilterAmount',
  data() {
    return {
      model: {
        amount: null,
      },
    }
  },
  computed: {
    ...mapGetters({ filterOrder: 'binance/filterOrder' }),
  },
  methods: {
    ...mapActions({ setFilterOrderItem: 'binance/setFilterOrderItem' }),
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
</style>
