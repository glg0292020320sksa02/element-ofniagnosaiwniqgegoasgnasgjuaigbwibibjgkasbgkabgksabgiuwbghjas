<template>
  <div class="border rounded shadow p-4">
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center">
        <svg-icon name="trend" size="60"></svg-icon>
        <div class="mx-3">
          <div class="font-bold">
            5 thành viên trong mạng lưới của bạn đang có tổng giao dịch tăng
          </div>
          <div class="text-subtitle">
            Bạn có thể kiếm thêm thu nhập lên đến 30% phí trên mỗi giao dịch của
            thành viên của bạn khi kích hoạt tài khoản F1
          </div>
        </div>
      </div>
      <div>
        <el-button type="success">Kích hoạt ngay</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardAds',
}
</script>
