<template>
  <div class="user-detail-page container py-10">
    <div class="bg-white rounded">
      <div class="border-b p-5 flex justify-between items-center">
        <div class="text-xl font-bold">
          {{ $t('userDetailIntro') }} {{ selectedUserView.name }}
        </div>
      </div>
      <div class="p-5">
        <table-content-loader v-if="$fetchState.pending"></table-content-loader>
        <div v-else class="table table-hover text-sm relative">
          <table>
            <tbody>
              <tr>
                <td>{{ $t('userDetailTransactionQty') }}</td>
                <td>
                  <el-tag
                    v-for="(coin, index) in userDetail.currencies_with_total"
                    :key="index + 'coin'"
                    size="mini"
                    class="mr-2 text-white border-0"
                    :class="color[index]"
                  >
                    {{ coin.total }} {{ coin.symbol }}
                  </el-tag>
                </td>
              </tr>
              <tr>
                <td>{{ $t('userDetailTransactionSuccess') }}</td>
                <td>
                  <strong class="text-success">
                    {{ userDetail.total_transactions }}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>{{ $t('userDetailPartner') }}</td>
                <td>
                  <strong class="text-success">
                    {{ userDetail.total_partners }}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>{{ $t('userDetailJoined') }}</td>
                <td>
                  {{ formatTimeago(userDetail.joined_at) }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('userDetailLastLogin') }}</td>
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
      color: ['bg-red-400', 'bg-purple-500', 'bg-teal-500', 'bt-green--500'],
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
