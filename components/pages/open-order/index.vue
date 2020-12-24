<template>
  <div class="open-order">
    <el-table
      ref="openOrder"
      :data="data"
      class="whitespace-nowrap cursor-pointer"
      @expand-change="loadTradeHistoryData"
      @row-click="selectRow"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="bg-gray-200 p-4">
            <trade-history
              :scope="props"
              :data="listTransactions"
            ></trade-history>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" width="70px">
        <template slot-scope="scope">#{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('date')"
        prop="created_at"
        width="170px"
      ></el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('pair')"
        prop="pair"
        width="100px"
      ></el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('side')"
        prop="side"
        width="70px"
      >
        <template slot-scope="scope">
          <strong :class="getColorSide(scope.row.side)">
            {{ scope.row.side }}
          </strong>
        </template>
      </el-table-column>
      <el-table-column class="text-left" :label="$t('amount')" prop="amount">
        <template slot-scope="scope">
          <div class="flex justify-start items-center">
            <strong>{{ scope.row.amount | filterPrice }}</strong>
            <span class="ml-1 text-xs text-subtitle">
              {{ sourceSymbol(scope.row.source_symbol) }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column class="text-left" :label="$t('price')" prop="price">
        <template slot-scope="scope">
          <div class="flex justify-start items-center">
            <strong>{{ scope.row.price | filterPrice }}</strong>
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
        class="text-left"
        :label="$t('filled')"
        prop="filted"
        width="150px"
      >
        <template slot-scope="scope">
          <el-progress
            :percentage="Number(scope.row.filled)"
            :width="100"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column class="text-right" :label="$t('total')" prop="total">
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
      <el-table-column :label="$t('action')" width="100px" class="text-center">
        <el-link
          type="warning"
          class="uppercase text-xs"
          @click="onCancelOrder"
        >
          {{ $t('Cancel') }}
        </el-link>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import { filterPrice } from '@/filters'
import TradeHistory from '@/components/pages/trade-history/'
export default {
  name: 'OpenOrder',
  filters: { filterPrice },
  components: {
    TradeHistory,
  },
  props: {
    data: {
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
  methods: {
    ...mapActions({
      deleteOrder: 'market/deleteOrder',
      getAllOrderTransactions: 'market/getAllOrderTransactions',
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
    async loadTradeHistoryData(row, exxpandRow) {
      if (exxpandRow.length > 1)
        this.$refs.openOrder.toggleRowExpansion(exxpandRow[0], false)

      const { data, total } = await this.getAllOrderTransactions(row.id)

      this.listTransactions = data
      this.transTotal = total
    },
    selectRow(row) {
      this.$refs.openOrder.toggleRowExpansion(row, true)
    },
  },
}
</script>
<style lang="scss">
.open-order .el-table__header,
.open-order .el-table__body,
.open-order .el-table__footer {
  table-layout: auto;
}
.open-order .el-table__body,
.open-order .el-table__header {
  width: 100% !important;
}
.open-order .el-table__row td,
.open-order .has-gutter th {
  padding: 1.25rem 0.25rem !important;
  width: fit-content !important;
}
.open-order .has-gutter th .cell {
  text-align: center !important;
}
.open-order .el-table__expanded-cell {
  padding: 0 !important;
}
</style>
