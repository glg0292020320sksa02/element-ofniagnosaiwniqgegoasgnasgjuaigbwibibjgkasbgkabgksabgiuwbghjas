<template>
  <div class="overflow-x-auto">
    <div class="table table-hover">
      <table>
        <thead class="text-sm">
          <tr class="text-subtitle">
            <th class="text-left">
              {{ type === 'sell' ? $t('seller') : $t('buyer') }}
            </th>
            <th class="text-left">{{ $t('price') }}/ {{ activeTab }}</th>
            <th class="text-right">{{ $t('quantity') }}</th>
            <th class="text-center">{{ $t('payment-by') }}</th>
            <th class="text-right">{{ $t('action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id" class="text-sm">
            <td>
              <div class="flex justify-start items-center">
                <div>
                  <img
                    :src="`https://randomuser.me/api/portraits/thumb/men/${order.id}.jpg`"
                    alt=""
                    class="rounded-full avatar"
                  />
                </div>
                <div class="pl-2 flex flex-col justify-start items-start">
                  <span class="text-sm">{{ genUserName(order) }}</span>
                  <span class="text-xs text-subtitle">******@gmail.com</span>
                </div>
              </div>
            </td>
            <td class="text-left">
              <span class="font-bold text-green-600">
                {{ order.price | filterPrice }}
              </span>
              <span class="text-xs text-subtitle">
                {{ order.target_symbol }}
              </span>
            </td>
            <td>
              <div class="text-right font-bold">
                {{ order.remaining_amount | filterPrice }}
                {{ order.source_symbol }}
              </div>
              <div class="text-right text-xs text-subtitle">
                (~{{ order.remaining_total | filterPrice }}
                {{ order.target_symbol }})
              </div>
            </td>
            <td class="text-center">
              <slot name="paymentMethod" v-bind="order"></slot>
            </td>
            <td class="text-right">
              <slot name="action" v-bind="{ order, index }"></slot>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="!orders.length">
          <tr>
            <td colspan="5" class="text-center p-8 font-bold text-sm">
              {{ $t('orderNotFound') }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { filterPrice } from '@/filters'

export default {
  name: 'ElTabPaneCrypto',
  filters: { filterPrice },
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: { ...mapGetters({ activeTab: 'activeTab' }) },
  methods: {
    genUserName(order) {
      return order?.user?.name || ''
    },
  },
}
</script>

<style lang="scss">
.avatar {
  width: 30px;
  height: 30px;
}
</style>
