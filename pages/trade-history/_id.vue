<template>
  <div class="user-detail-page container py-8">
    <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
      <div class="py-4 flex justify-between items-center">
        <strong
          class="font-bold text-base px-4 py-1 rounded-full bg-gray-200 text-gray-900 relative"
        >
          {{ $t('navTradeHistory') }}
          <span class="text-primary">#{{ transactionDetail.id }}</span>
          <span
            class="h-1 w-1 p-1 inline-block rounded-full border-4 absolute top-0 left-0"
            :class="
              transactionDetail.status === 'PENDING'
                ? 'border-red-100 bg-error'
                : 'border-blue-100 bg-success'
            "
          ></span>
        </strong>
      </div>
      <div class="p-6 pb-12 bg-white rounded-lg shadow-sm">
        <table-content-loader v-if="$fetchState.pending"></table-content-loader>
        <div v-else class="table text-sm relative">
          <table>
            <tbody>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailSide') }}
                </td>
                <td>
                  <el-tag
                    size="mini"
                    class="mr-2 border-0 px-4 rounded-full font-bold"
                    :class="
                      transactionDetail.side === 'BUY'
                        ? 'bg-blue-100 text-success'
                        : 'bg-red-100 text-error'
                    "
                  >
                    {{ transactionDetail.side }}
                  </el-tag>
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailStatus') }}
                </td>
                <td>
                  <el-tag
                    size="mini"
                    class="mr-2 border-0 px-4 rounded-full font-bold"
                    :class="
                      transactionDetail.status === 'PENDING'
                        ? 'bg-red-100 text-error'
                        : 'bg-blue-100 text-success'
                    "
                  >
                    {{ transactionDetail.status }}
                  </el-tag>
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailPair') }}
                </td>
                <td>
                  <strong>
                    {{ transactionDetail.pair }}
                  </strong>
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailAmount') }}
                </td>
                <td>
                  <strong>
                    {{ transactionDetail.amount | filterPrice }}
                    <span class="text-subtitle text-xs font-normal">
                      {{ transactionDetail.source_symbol }}
                    </span>
                  </strong>
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailPrice') }}
                </td>
                <td>
                  <strong>
                    {{ transactionDetail.price | filterPrice }}
                    <span class="text-subtitle text-xs font-normal">
                      {{ transactionDetail.target_symbol }}/{{
                        transactionDetail.source_symbol
                      }}
                    </span>
                  </strong>
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailFee') }}
                </td>
                <td>
                  <strong>
                    {{ transactionDetail.fee | filterPrice }}
                    <span class="text-subtitle text-xs font-normal">
                      {{ transactionDetail.source_symbol }}
                    </span>
                  </strong>
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailTotal') }}
                </td>
                <td>
                  <strong>
                    {{ transactionDetail.total | filterPrice }}
                    <span class="text-subtitle text-xs font-normal">
                      {{ transactionDetail.target_symbol }}
                    </span>
                  </strong>
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailPartner') }}
                </td>
                <td>
                  <strong class="text-success">
                    <a
                      class="text-primary underline cursor-pointer font-bold"
                      @click="viewDetailUser(partner)"
                    >
                      {{ partner.name }}
                    </a>
                  </strong>
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailCreatedAt') }}
                </td>
                <td>
                  {{ formatTimeago(transactionDetail.created_at) }}
                </td>
              </tr>
              <tr>
                <td class="p-3 px-0 font-bold text-gray-700">
                  {{ $t('transactionDetailUpdateAt') }}
                </td>
                <td>
                  {{ formatTimeago(transactionDetail.updated_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { format as formatTimeago } from 'timeago.js'
import { filterPrice } from '@/filters'

import TableContentLoader from '@/components/common/table-content-loader'

export default {
  name: 'TransactionDetail',
  filters: { filterPrice },
  components: {
    TableContentLoader,
  },
  fetch() {
    this.loadUserDetail()
  },
  data() {
    return {
      transactionDetail: {},
      color: [
        'bg-red-500',
        'bg-teal-500',
        'bg-gray-500',
        'bg-green-500',
        'bg-pink-500',
        'bg-yellow-500',
      ],
    }
  },
  computed: {
    ...mapGetters({ selectedUserView: 'selectedUserView' }),
    partner() {
      return !this.transactionDetail.side
        ? {}
        : this.transactionDetail.side.toLowerCase() === 'buy'
        ? this.transactionDetail.seller
        : this.transactionDetail.buyer
    },
  },
  methods: {
    ...mapActions({
      getTransactionDetail: 'getTransactionDetail',
      setSelectedUserView: 'setSelectedUserView',
    }),
    formatTimeago,
    async loadUserDetail() {
      const data = await this.getTransactionDetail(this.$route.params.id)

      this.transactionDetail = data
    },
    viewDetailUser(partner) {
      this.setSelectedUserView(partner)
      this.$router.push(`/user-detail/${partner.id}`)
    },
  },
}
</script>
