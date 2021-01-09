<template>
  <div
    class="exchange-drawer-buy p-4 flex flex-col justify-start items-stretch text-sm"
  >
    <input-form label="Amount" class="mb-6">
      <el-input></el-input>
    </input-form>
    <div class="flex flex-col justify-start items-stretch">
      <div class="flex flex-row justify-between items-baseline py-2 border-b">
        <span>Coin</span>
        <strong>BTC</strong>
      </div>
      <div class="flex flex-row justify-between items-baseline py-2 border-b">
        <span>Price</span>
        <strong>23,1010,100.15 VNDS/1 BTC</strong>
      </div>
      <div class="flex flex-row justify-between items-baseline py-2 border-b">
        <span>Amount</span>
        <strong>0.19030202 BTC</strong>
      </div>
      <div class="flex flex-row justify-between items-baseline py-2 border-b">
        <span>Fee</span>
        <strong>15 VNDS</strong>
      </div>
      <div class="flex flex-row justify-between items-baseline py-2 border-b">
        <span>Total</span>
        <strong>10,102,210.11 VNDS</strong>
      </div>
    </div>
    <el-button type="success">BUY BTC</el-button>
    <form action="https://perfectmoney.is/api/step1.asp" method="POST">
      <input type="hidden" name="PAYEE_ACCOUNT" value="U27777003" />
      <input type="hidden" name="PAYEE_NAME" value="My Company" />
      <input type="text" name="PAYMENT_AMOUNT" value="" placeholder="Amount" />
      <input type="hidden" name="PAYMENT_UNITS" value="USD" />
      <input
        type="hidden"
        name="PAYMENT_URL"
        value="http://example.com/success"
      />
      <input
        type="hidden"
        name="NOPAYMENT_URL"
        value="http://example.com/fail"
      />
      <input
        type="hidden"
        name="STATUS_URL"
        value="https://d3000bcf0d4a.ngrok.io/pm/status"
      />

      <input type="submit" value="Proceed" />
    </form>
  </div>
</template>
<script>
import InputForm from '@/components/common/input-form'
export default {
  name: 'ExchangeDrawerBuy',
  components: {
    InputForm,
  },
}
</script>
