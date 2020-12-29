<template>
  <div class="trade-history">
    <el-table :data="data" class="whitespace-nowrap">
      <el-table-column label="ID" prop="id" width="70px">
        <template slot-scope="scope">
          <nuxt-link
            class="text-primary underline cursor-pointer font-bold"
            :to="`trade-history/${scope.row.id}`"
          >
            #{{ scope.row.id }}
          </nuxt-link>
        </template>
      </el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('date')"
        prop="updated_at"
        width="170px"
      ></el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('pair')"
        prop="pair"
        width="120px"
      >
        <template slot-scope="scope">
          <span
            class="text-primary underline cursor-pointer font-bold"
            @click="redirectToHomePage(scope.row.source_symbol)"
          >
            {{
              `${targetSymbol(scope.row.target_symbol)}/${sourceSymbol(
                scope.row.source_symbol
              )}`
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('partner')"
        prop="pair"
        width="120px"
      >
        <template slot-scope="scope">
          <a
            class="text-primary underline cursor-pointer font-bold"
            @click="viewDetailUser(scope.row)"
          >
            {{ partnerName(scope.row) }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('side')"
        prop="side"
        width="100px"
      >
        <template slot-scope="scope">
          <strong
            :class="getColorSide(scope.row.side)"
            class="py-1 px-4 text-xs rounded-full"
          >
            {{ scope.row.side }}
          </strong>
        </template>
      </el-table-column>
      <el-table-column
        class="text-left"
        :label="`${$t('amountCoin')} & ${$t('price')}`"
        prop="amount"
        width="200px"
      >
        <template slot-scope="scope">
          <div class="flex justify-start items-center">
            <strong>{{ scope.row.amount | filterPrice }}</strong>
            <span class="ml-1 text-xs text-subtitle">
              {{ sourceSymbol(scope.row.source_symbol) }}
            </span>
          </div>
          <div class="flex justify-start text-xs items-center">
            <span>{{ scope.row.price | filterPriceMoney }}</span>
            <span class="ml-1 text-xs text-subtitle">
              {{
                `${targetSymbol(scope.row.target_symbol)}/${sourceSymbol(
                  scope.row.source_symbol
                )}`
              }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        class="text-right"
        :label="$t('total')"
        prop="total"
        width="200px"
      >
        <template slot-scope="scope">
          <div class="flex justify-end items-center">
            <strong :class="getColorTotal(scope.row.total)">
              {{ scope.row.total | filterPrice }}
            </strong>
            <span class="ml-1 text-xs text-subtitle">
              {{ targetSymbol(scope.row.target_symbol) }}
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import { filterPrice, filterPriceMoney } from '@/filters'

export default {
  name: 'TradeHistory',
  filters: { filterPrice, filterPriceMoney },
  props: {
    data: {
      type: [Object, Array],
      required: true,
    },
  },
  methods: {
    ...mapActions({
      deleteOrder: 'market/deleteOrder',
      setActiveTab: 'setActiveTab',
      setSelectedUserView: 'setSelectedUserView',
    }),

    async onCancelOrder() {
      this.$notify.closeAll()

      const isConfirm = await this.confirmCancelOrder()

      if (!isConfirm) return

      try {
        await this.deleteOrder(this.order.id)

        this.$notify({
          title: this.$t('cancel-order-success'),
          type: 'success',
        })
      } catch (e) {
        this.$notify({
          title: this.$t('cancel-order-failure'),
          message: this.$t('pleaseTryAgain'),
          type: 'error',
        })
      }
    },
    async confirmCancelOrder() {
      try {
        return await this.$confirm(
          this.$t('confirm-cancel-order'),
          this.$t('warning'),
          {
            confirmButtonText: this.$t('agree'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning',
          }
        )
      } catch {
        return false
      }
    },
    getColorSide(side) {
      return side.toLowerCase() === 'buy'
        ? 'text-success bg-green-100'
        : 'text-error bg-red-100'
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
    partner(transaction) {
      return transaction.side.toLowerCase() === 'buy'
        ? transaction.seller
        : transaction.buyer
    },
    partnerName(transaction) {
      return transaction.side.toLowerCase() === 'buy'
        ? transaction.seller.name
        : transaction.buyer.name
    },
    redirectToHomePage(target) {
      this.setActiveTab(target)
      this.$router.push('/')
    },
    viewDetailUser(transaction) {
      const partner = this.partner(transaction)

      this.setSelectedUserView(partner)
      this.$router.push(`/user-detail/${partner.id}`)
    },
  },
}
</script>
<style lang="scss">
.trade-history .el-table__header,
.trade-history .el-table__body,
.trade-history .el-table__footer {
  table-layout: auto;
}
.trade-history .el-table__body,
.trade-history .el-table__header {
  width: 100% !important;
}
.trade-history .el-table__row td,
.trade-history .has-gutter th {
  padding: 1.25rem 0.25rem !important;
  width: fit-content !important;
}

.trade-history .has-gutter th .cell {
  text-align: center !important;
}
.trade-history .el-table__expanded-cell {
  padding: 0 !important;
}
</style>
