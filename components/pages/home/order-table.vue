<template>
  <div class="order-table text-sm">
    <div class="order-header flex justify-between items-start text-xs p-6">
      <div class="header-column w-2/12">
        <span class="text-subtitle">Người quảng cáo</span>
      </div>
      <div class="header-column w-2/12">
        <span class="text-subtitle">Giá</span>
      </div>
      <div class="header-column w-4/12">
        <span class="text-subtitle">Giới hạn/ Khả dụng</span>
      </div>
      <div class="header-column w-2/12">
        <span class="text-subtitle">Thanh toán</span>
      </div>
      <div class="header-column w-2/12 flex justify-end">
        <span class="text-subtitle">Giao dịch</span>
      </div>
    </div>
    <div class="order-list bg-white rounded">
      <div
        v-for="i in 5"
        :key="i"
        class="order-item p-6 flex flex-row justify-between items-center border-b border-b-gray-200"
      >
        <div class="order-column w-2/12">
          <div class="flex flex-row justify-start items-center">
            <span
              class="text-xs w-4 h-4 mr-1 text-white rounded-full bg-primary text-center flex justify-center items-center"
            >
              B
            </span>
            <span class="text-sm text-primary">Badaoitem</span>
          </div>
          <div class="text-subtitle text-xs pl-5 mt-2">
            <span>62 lệnh 96.88% hoàn tất</span>
          </div>
        </div>
        <div class="order-column w-2/12">
          <div class="flex flex-row justify-start items-baseline">
            <strong class="text-lg text-bold mr-1">24,03300</strong>
            <span class="text-subtitle text-xs">VND</span>
          </div>
        </div>
        <div class="order-column w-4/12">
          <div class="flex flex-col justify-center items-start">
            <div class="flex flex-row justify-start items-baseline text-xs">
              <span class="text-subtitle mr-1">Kha dung:</span>
              <span>12,0202020 BTC</span>
            </div>
            <div
              class="flex flex-row justify-start items-baseline text-xs mt-2"
            >
              <span class="text-subtitle mr-1">Gioi han:</span>
              <span>₫50,000,000.00 - ₫294,343,817.34</span>
            </div>
          </div>
        </div>
        <div class="order-column w-2/12">
          <div class="flex flex-col justify-center items-start">
            <div class="text-xs flex flex-row justify-start items-center mb-2">
              <span class="bg-yellow-500 text-xs rounded-sm p-1 mr-1">
                <icon-buy class="w-2 h-2 text-white"></icon-buy>
              </span>
              <p class="w-2/3 truncate whitespace-normal">
                Chuyen khoan ngan hang
              </p>
            </div>
            <div class="text-xs flex flex-row justify-start items-center mb-2">
              <span class="bg-yellow-500 text-xs rounded-sm p-1 mr-1">
                <icon-buy class="w-2 h-2 text-white"></icon-buy>
              </span>
              <p class="w-2/3 truncate whitespace-normal">VNDS</p>
            </div>
            <div class="text-xs flex flex-row justify-start items-center mb-2">
              <span class="bg-yellow-500 text-xs rounded-sm p-1 mr-1">
                <icon-buy class="w-2 h-2 text-white"></icon-buy>
              </span>
              <p class="w-2/3 truncate whitespace-normal">Techcombank</p>
            </div>
          </div>
        </div>
        <div class="order-column w-2/12">
          <div class="flex flex-row justify-end">
            <button
              class="success-btn rounded px-3 py-2 text-white font-bold text-xs"
            >
              Mua USDT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBuy from '@/components/ui/icon/icon-buy'
export default {
  name: 'OrderTable',
  components: {
    IconBuy,
  },
}
</script>
