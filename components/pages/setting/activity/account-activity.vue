<template>
  <div>
    <div>
      <div class="font-bold text-primary">{{ $t('account-activity') }}</div>
      <div>
        <span class="text-sm text-subtitle">
          {{ $t('recent-activity-on-your-account') }}
        </span>
      </div>
    </div>

    <table-content-loader v-if="$fetchState.pending"></table-content-loader>

    <div v-else class="overflow-x-auto mt-6">
      <div class="table table-hover">
        <table>
          <thead class="text-sm text-subtitle">
            <tr>
              <th class="text-left">{{ $t('action') }}</th>
              <th class="text-left">{{ $t('source') }}</th>
              <th class="text-left">{{ $t('ip-address') }}</th>
              <th class="text-left">{{ $t('location') }}</th>
              <th class="text-left">{{ $t('when') }}</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="activity in listActivity" :key="activity.id">
              <td>{{ activity.subject_type }}</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>
                <span class="text-primary">
                  {{ formatTimeago(activity.created_at) }}
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="!listActivity.length">
            <tr>
              <td colspan="5" class="text-center p-8 font-bold text-sm">
                {{ $t('activityNotFound') }}
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

import TableContentLoader from '@/components/common/table-content-loader'

export default {
  name: 'AccountActivity',
  components: { TableContentLoader },
  fetch() {
    this.loadActivityLogs()
  },
  data() {
    return {
      listActivity: [],
    }
  },
  methods: {
    formatTimeago,

    ...mapActions({
      getActivityLogs: 'setting/getActivityLogs',
    }),

    async loadActivityLogs() {
      const { data } = await this.getActivityLogs()

      this.listActivity = data
    },
  },
}
</script>
