<template>
  <div class="exchange-sell text-sm">
    <div v-if="$auth.loggedIn" class="flex flex-col justify-center items-start">
      <!-- <form
        action="https://perfectmoney.is/api/step1.asp"
        method="POST"
        target="_blank"
        class="justify-end items-end hidden"
      >
        <input type="hidden" name="PAYEE_ACCOUNT" value="U27777003" />
        <input type="hidden" name="PAYEE_NAME" value="My Company" />
        <label class="block mr-2">
          <span class="text-subtitle inline-block text-xs mb-2">
            {{ $t('amount') }}
          </span>
          <input-currency
            v-model="amount"
            type="text"
            name="PAYMENT_AMOUNT"
            value=""
            placeholder="0.000"
            class="form-input mt-1 block w-full text-sm focus:outline-primary-100 focus:border-body"
          ></input-currency>
        </label>
        <input
          type="text"
          name="PAYMENT_AMOUNT"
          :value="amount"
          placeholder="0.000"
          class="p-3 border hidden rounded border-gray-400"
        />
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
      </form> -->
      <div id="submit-form-pm" class="hidden"></div>
      <div class="flex justify-end items-end">
        <label class="block mr-2">
          <span class="text-subtitle inline-block text-xs mb-2">
            {{ $t('amount') }}
          </span>
          <!-- <input-form :label="$t('amount')" class="mr-2"> -->
          <input-currency
            v-model="amount"
            type="text"
            name="PAYMENT_AMOUNT"
            value=""
            placeholder="0.000"
            class="form-input mt-1 block w-full text-sm focus:outline-primary-100 focus:border-body"
          ></input-currency>
        </label>
        <el-button
          type="success"
          class="text-xs uppercase font-bold"
          :loading="loading"
          @click="onDeposit"
        >
          {{ $t('deposit') }}
        </el-button>
      </div>
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
// import InputForm from '@/components/common/input-form'
import IconArrowRight from '@/components/ui/icon/icon-arrow-right'
import InputCurrency from '@/components/ui/input-currency'

export default {
  name: 'HoldingDeposit',
  components: {
    IconArrowRight,
    InputCurrency,
    // InputForm,
  },
  directives: { clipboard },
  mixins: [clipboardSelection],
  data() {
    return {
      amount: 0,
      loading: false,
      htmlForm: '',
    }
  },
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
    ...mapActions({
      depositPM: 'wallet/depositPM',
    }),
    isClipboardSelection({ address }) {
      return address === this.clipboardSelection
    },
    async onDeposit() {
      this.$notify.closeAll()

      const body = {
        amount: this.amount.toString(),
      }

      try {
        if (!this.amount || this.amount === 0) {
          return
        }

        this.loading = true
        const sumitDiv = document.getElementById('submit-form-pm')
        const htmlForm = await this.depositPM(body)

        sumitDiv.insertAdjacentHTML('afterend', htmlForm.html)

        const form = document.getElementsByTagName('form')

        form[0].setAttribute('target', '_blank')

        const submitForm = document.querySelector('form[target="_blank"]')

        if (submitForm) {
          submitForm.submit()
          await this.$success({
            title: this.$t('success'),
            subtitle: this.$t('depositSuccessful'),
            actionText: this.$t('pleaseReturnHomePage'),
            actionMethod: () => this.$router.go(-1),
          })
        }
      } catch (e) {
        this.$notify({
          title: this.$t('failure'),
          message: e.exception,
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
