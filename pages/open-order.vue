<template>
  <div class="page-open-order container py-8 space-y-8">
    <div class="bg-gray-100 rounded-lg shadow-lg">
      <div class="border-b p-8 flex justify-between items-center">
        <div class="text-xl font-bold">{{ $t('openOrder') }}</div>
      </div>
      <div class="px-8 pb-12">
        <div class="flex justify-between w-2/5 mt-4 ml-auto mr-0">
          <filter-date
            :start-date.sync="options.from_date"
            :end-date.sync="options.to_date"
            class="mx-1"
          ></filter-date>
          <filter-pair v-model="options.pair" class="mx-1"></filter-pair>
          <filter-side v-model="options.side" class="mx-1"></filter-side>
        </div>

        <table-content-loader v-if="$fetchState.pending"></table-content-loader>

        <div
          v-else
          v-infinite-scroll="loadMoreOrders"
          :infinite-scroll-disabled="disabledInfinitiScroll"
          class="mt-6 overflow-y-scroll"
          style="height: 500px"
        >
          <div
            class="table table-hover text-sm relative mb-16 bg-gray-100 rounded-lg"
          >
            <open-order-table
              :items="listOrders"
              @reload="loadOrders"
            ></open-order-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import TableContentLoader from '@/components/common/table-content-loader'
import FilterDate from '@/components/common/setting/filter-date'
import FilterPair from '@/components/common/setting/filter-pair'
import FilterSide from '@/components/common/setting/filter-side'
import OpenOrderTable from '@/components/pages/open-order/open-order-table'

export default {
  name: 'OpenOrderPage',
  components: {
    TableContentLoader,
    FilterDate,
    FilterSide,
    FilterPair,
    OpenOrderTable,
  },
  fetch() {
    this.loadOrders()
  },
  data() {
    return {
      listOrders: [],
      total: 0,
      options: {
        from_date: '',
        to_date: '',
        side: '',
        pair: '',
        page: 1,
        status: 'PENDING',
      },
      loading: false,
    }
  },
  computed: {
    optionsToString() {
      return (
        this.options.from_date +
        this.options.to_date +
        this.options.side +
        this.options.pair +
        this.activeTab
      )
    },
    disabledInfinitiScroll() {
      return this.listOrders.length === this.total
    },
  },
  watch: {
    optionsToString() {
      this.options.page = 1
      this.loadOrders()
    },
  },
  methods: {
    ...mapActions({
      getOrders: 'market/getOrders',
    }),

    async loadMoreOrders() {
      if (this.loading) return

      try {
        this.loading = true
        this.options.page += 1
        const { data } = await this.getOrders(this.options)

        this.listOrders = [...this.listOrders, ...data]
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async loadOrders() {
      const { data, total } = await this.getOrders(this.options)

      this.listOrders = data
      this.total = total
    },
  },
}
</script>
