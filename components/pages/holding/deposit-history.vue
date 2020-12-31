<template>
  <div class="deposit-history">
    <el-table
      ref="openOrder"
      :data="data"
      class="whitespace-nowrap cursor-pointer"
      @row-click="selectRow"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="p-4 pl-16">
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong class="mr-1">{{ $t('txId') }}:</strong>
                  </td>
                  <td>
                    <a
                      :href="props.row.txn_url"
                      target="_blank"
                      class="uppercase text-xs text-primary underline"
                    >
                      {{ props.row.txn_id }}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong class="mr-1">{{ $t('status') }}:</strong>
                  </td>
                  <td>
                    <strong
                      class="rounded-full py-1 px-2 text-xs"
                      :class="{
                        'text-success bg-primary-100':
                          props.row.status === 'COMPLETED',
                        'text-warning bg-warning-200':
                          props.row.status === 'PENDING',
                      }"
                    >
                      {{ props.row.status }}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong class="mr-1">{{ $t('FromAddress') }}:</strong>
                  </td>
                  <td>{{ props.row.from_wallet_id }}</td>
                </tr>
                <tr>
                  <td>
                    <strong class="mr-1">{{ $t('ToAddress') }}:</strong>
                  </td>
                  <td>{{ props.row.to_wallet_id }}</td>
                </tr>
                <tr>
                  <td>
                    <strong class="mr-1">{{ $t('date') }}:</strong>
                  </td>
                  <td>{{ props.row.updated_at }}</td>
                </tr>
                <tr>
                  <td>
                    <strong class="mr-1">{{ $t('symbol') }}:</strong>
                  </td>
                  <td>{{ sourceSymbol(props.row.source_symbol) }}</td>
                </tr>
                <tr>
                  <td>
                    <strong class="mr-1">{{ $t('quantity') }}:</strong>
                  </td>
                  <td>{{ props.row.amount }}</td>
                </tr>
                <tr>
                  <td>
                    <strong class="mr-1">{{ $t('Confirmation') }}:</strong>
                  </td>
                  <td>{{ 0 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('date')"
        prop="updated_at"
        width="200px"
      ></el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('coin')"
        prop="coin"
        width="150px"
      >
        <template slot-scope="scope">
          <strong>{{ sourceSymbol(scope.row.source_symbol) }}</strong>
        </template>
      </el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('amount')"
        prop="amount"
        width="300px"
      >
        <template slot-scope="scope">
          <div class="flex justify-start items-center">
            <strong>{{ scope.row.amount | filterPrice }}</strong>
            <span class="ml-1 text-xs text-subtitle">
              {{ sourceSymbol(scope.row.source_symbol) }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        class="text-left"
        :label="$t('status')"
        prop="status"
        width="170px"
      >
        <template slot-scope="scope">
          <strong
            class="rounded-full py-1 px-2 text-xs"
            :class="{
              'text-success bg-primary-100': scope.row.status === 'COMPLETED',
              'text-warning bg-warning-200': scope.row.status === 'PENDING',
            }"
          >
            {{ scope.row.status }}
          </strong>
        </template>
      </el-table-column>
      <el-table-column class="text-left" :label="$t('fee')" prop="fee">
        <template slot-scope="scope">
          <div class="flex justify-start items-center">
            <strong>{{ scope.row.fee | filterPrice }}</strong>
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
    </el-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import { filterPrice } from '@/filters'
export default {
  name: 'DepositHistory',
  filters: { filterPrice },
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
      getAllOrderTransactions: 'market/getAllOrderTransactions',
    }),

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
<style lang="scss">
.deposit-history .el-table__header,
.deposit-history .el-table__body,
.deposit-history .el-table__footer {
  table-layout: auto;
}
.deposit-history .el-table__body,
.deposit-history .el-table__header {
  width: 100% !important;
}
.deposit-history .has-gutter th .cell {
  text-transform: uppercase !important;
  font-size: 0.75rem !important;
}
.deposit-history .el-table__row td,
.deposit-history .has-gutter th {
  padding: 1.25rem 0.25rem !important;
  width: fit-content !important;
}
.deposit-history .el-table__expanded-cell {
  padding: 0 !important;
}
</style>
