<template>
  <div class="exchange-sell text-sm">
    <div class="flex flex-row justify-end items-end">
      <label class="block mr-2">
        <div>
          <span class="text-subtitle text-xs">Số lượng</span>
          <button class="text-xxs rounded-full px-2 bg-indigo-100 text-primary">
            25%
          </button>
          <button class="text-xxs rounded-full px-2 bg-indigo-100 text-primary">
            50%
          </button>
          <button class="text-xxs rounded-full px-2 bg-indigo-100 text-primary">
            75%
          </button>
          <button class="text-xxs rounded-full px-2 bg-indigo-100 text-primary">
            MAX
          </button>
        </div>
        <input
          class="form-input mt-1 block w-full text-sm border-indigo-600 focus:outline-indigo-100 focus:border-indigo-600"
          placeholder="0,0000 BTC"
        />
      </label>
      <button class="px-4 py-2 rounded error-btn text-white font-bold">
        Xác nhận
      </button>
    </div>
    <div
      class="flex flex-col justify-start items-start text-xs text-subtitle mt-2"
    >
      <p>
        <strong>≈ 23,0290101.02020</strong>
        VNDS
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeSell',
}
</script>
