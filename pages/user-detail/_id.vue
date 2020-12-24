<template>
  <div class="user-detail-page container py-8">
    <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
      <div class="py-4 flex justify-between items-center">
        <strong
          class="font-bold text-base px-4 py-1 rounded-full bg-gray-200 text-gray-900 relative"
        >
          {{ $t('userDetailIntro') }}
          <span class="text-primary">#{{ selectedUserView.name }}</span>
        </strong>
      </div>
      <div class="p-6 pb-12 bg-white rounded-lg shadow-sm">
        <table-content-loader v-if="$fetchState.pending"></table-content-loader>
        <div v-else class="table table-hover text-sm relative">
          <table>
            <tbody>
              <tr>
                <td class="p-4 px-0 font-bold text-gray-700">
                  {{ $t('userDetailTransactionQty') }}
                </td>
                <td>
                  <el-tag
                    v-for="(coin, index) in userDetail.currencies_with_total"
                    :key="index + 'coin'"
                    size="mini"
                    class="mr-2 text-white border-0 px-2 rounded-full"
                    :class="color[index] || 'bg-gray-500'"
                  >
                    {{ coin.total }} {{ coin.symbol }}
                  </el-tag>
                </td>
              </tr>
              <tr>
                <td class="p-4 px-0 font-bold text-gray-700">
                  {{ $t('userDetailTransactionSuccess') }}
                </td>
                <td>
                  <strong class="text-success">
                    {{ userDetail.total_transactions }}
                  </strong>
                </td>
              </tr>
              <tr>
                <td class="p-4 px-0 font-bold text-gray-700">
                  {{ $t('userDetailPartner') }}
                </td>
                <td>
                  <strong class="text-success">
                    {{ userDetail.total_partners }}
                  </strong>
                </td>
              </tr>
              <tr>
                <td class="p-4 px-0 font-bold text-gray-700">
                  {{ $t('userDetailJoined') }}
                </td>
                <td>
                  {{ formatTimeago(userDetail.joined_at) }}
                </td>
              </tr>
              <tr>
                <td class="p-4 px-0 font-bold text-gray-700">
                  {{ $t('userDetailLastLogin') }}
                </td>
                <td>{{ formatTimeago(userDetail.last_logged_in_at) }}</td>
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

import TableContentLoader from '@/components/common/table-content-loader'

export default {
  name: 'UserDetailPage',
  components: {
    TableContentLoader,
  },
  fetch() {
    this.loadUserDetail()
  },
  data() {
    return {
      userDetail: {},
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
  },
  methods: {
    ...mapActions({
      getUserDetail: 'getUserDetail',
    }),
    formatTimeago,
    async loadUserDetail() {
      const data = await this.getUserDetail(this.$route.params.id)

      this.userDetail = data
    },
  },
}
</script>
