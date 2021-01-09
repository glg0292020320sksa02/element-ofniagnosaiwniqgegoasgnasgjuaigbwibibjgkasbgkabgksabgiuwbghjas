<template>
  <div class="exchange-sell text-sm">
    <div v-if="$auth.loggedIn" class="flex flex-col justify-center items-start">
      <form
        action="https://perfectmoney.is/api/step1.asp"
        method="POST"
        target="_blank"
        class="flex justify-end items-end"
      >
        <input type="hidden" name="PAYEE_ACCOUNT" value="U27777003" />
        <input type="hidden" name="PAYEE_NAME" value="My Company" />
        <input-form :label="$t('amount')" class="mr-2">
          <input
            type="text"
            name="PAYMENT_AMOUNT"
            value=""
            placeholder="0.000"
            class="p-3 border rounded border-gray-400"
          />
        </input-form>
        <input type="hidden" name="PAYMENT_UNITS" value="USD" />
        <input
          type="hidden"
          name="PAYMENT_URL"
          value="http://192.64.118.149:9999/api/deposit_pm/success"
        />
        <input
          type="hidden"
          name="NOPAYMENT_URL"
          value="http://192.64.118.149:9999/api/deposit_pm/fail"
        />
        <input
          type="hidden"
          name="STATUS_URL"
          value="http://192.64.118.149:9999/api/deposit_pm/status"
        />

        <button
          type="submit"
          value="Proceed"
          class="bg-success text-sm uppercase font-bold text-white p-3 px-6 rounded"
        >
          {{ $t('deposit') }}
        </button>
      </form>
      <span class="text-xs text-subtitle">PM (USD)</span>
    </div>
    <div v-else>
      <button
        class="rounded px-4 py-2 text-primary text-xs bg-primary-50 flex flex-nowrap"
        @click="redirectToLogin"
      >
        Bạn cần đăng nhập trước khi bán
        <icon-arrow-right class="w-4 h-4 ml-1"></icon-arrow-right>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import clipboardSelection from '@/mixins/clipboard-selection'
import { clipboard } from 'vue-clipboards'
import InputForm from '@/components/common/input-form'
import IconArrowRight from '@/components/ui/icon/icon-arrow-right'

export default {
  name: 'HoldingDeposit',
  components: {
    IconArrowRight,
    InputForm,
  },
  directives: { clipboard },
  mixins: [clipboardSelection],
  computed: {
    ...mapGetters({
      selectedWallets: 'wallet/selectedWallets',
    }),
    qrLink() {
      const link = 'otpauth://totp/{{NAME}}?secret={{KEY}}&issuer={{ISSUER}}'
      const issuer = 'C2A'
      const name = `${issuer}:${this.selectedWallets.address}`

      return link
        .replace(/{{NAME}}/g, name)
        .replace(/{{KEY}}/g, this.secretKey)
        .replace(/{{ISSUER}}/g, issuer)
    },
  },
  methods: {
    isClipboardSelection({ address }) {
      return address === this.clipboardSelection
    },
  },
}
</script>
