<template>
  <div>
    <div>
      <div class="font-bold text-primary">{{ $t('web-section') }}</div>
      <div class="flex justify-between">
        <span class="text-sm text-subtitle">
          {{ $t('these-sessions-are-currently-signed-in-to-your-account') }}
        </span>

        <remove-all-token
          @success="handleRemoveAllTokenSuccess"
        ></remove-all-token>
      </div>
    </div>

    <table-content-loader v-if="$fetchState.pending"></table-content-loader>

    <div v-else class="overflow-x-auto mt-6">
      <div class="table table-hover">
        <table>
          <thead class="text-sm text-subtitle">
            <tr>
              <th class="text-left">{{ $t('signed-in') }}</th>
              <th class="text-left">{{ $t('browser') }}</th>
              <th class="text-left">{{ $t('ip-address') }}</th>
              <th class="text-center">{{ $t('current') }}</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="logging in listLogging" :key="logging.id">
              <td>{{ formatTimeago(logging.created_at) }}</td>
              <td>
                <el-tooltip :content="logging.user_agent" placement="bottom">
                  <div class="w-64 truncate">{{ logging.user_agent }}</div>
                </el-tooltip>
              </td>
              <td>{{ logging.ip }}</td>
              <td class="text-center">
                <remove-token
                  :id="logging.id"
                  :is-revoked.sync="logging.is_revoked"
                  :is-current-session="logging.is_current_session"
                ></remove-token>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="!listLogging.length">
            <tr>
              <td colspan="4" class="text-center p-8 font-bold text-base">
                {{ $t('loginHistoryNotFound') }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { format as formatTimeago } from 'timeago.js'
import { mapActions } from 'vuex'

import RemoveToken from '@/components/pages/setting/activity/remove-token'
import RemoveAllToken from '@/components/pages/setting/activity/remove-all-token'
import TableContentLoader from '@/components/common/table-content-loader'

export default {
  name: 'AuthLoggings',
  components: {
    TableContentLoader,
    RemoveAllToken,
    RemoveToken,
  },
  fetch() {
    this.loadAuthLoggings()
  },
  data() {
    return {
      listLogging: [],
    }
  },
  methods: {
    formatTimeago,

    ...mapActions({
      getAuthLoggings: 'setting/getAuthLoggings',
    }),
    async loadAuthLoggings() {
      const { data } = await this.getAuthLoggings()

      this.listLogging = data
    },
    handleRemoveAllTokenSuccess() {
      this.listLogging = this.listLogging.map(logging => {
        if (logging.is_current_session) return logging

        logging.is_revoked = true

        return logging
      })
    },
  },
}
</script>
