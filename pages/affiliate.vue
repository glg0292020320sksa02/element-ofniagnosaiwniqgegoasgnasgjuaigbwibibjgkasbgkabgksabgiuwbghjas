<template>
  <div class="affiliate-page container py-10">
    <div class="p-8 bg-white">
      <div class="text-xl font-bold border-b pb-2">
        Mời bạn bè cùng nhau kiếm tiền mã hoá
      </div>
      <div class="mt-10">
        <div>
          <div class="font-bold">Giới thiệu ngay</div>
          <div class="text-subtitle text-sm">
            Sử dụng liên kết độc nhất của bạn để mời bạn bè qua tin nhắn hoặc
            email.
          </div>
        </div>
        <div class="mt-6">
          <div class="flex space-x-4">
            <div class="w-3/5 rounded border p-6">
              <div class="flex justify-between items-center">
                <div class="flex justify-start items-center">
                  <svg-icon name="circle-dot" size="26"></svg-icon>
                  <div class="ml-4">
                    <div class="font-bold">Mã giới thiệu : 1201190</div>
                    <div class="text-subtitle text-sm">
                      Hoặc sử dụng liên kết
                      <span class="text-primary">
                        https://c2a.com/affiliate/1201190
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <el-button
                    class="button-fab font-bold"
                    circle
                    icon="el-icon-copy-document"
                  ></el-button>
                </div>
              </div>
            </div>
            <div class="w-2/5 text-subtitle px-4 border-l">
              <div class="flex flex-column items-center">
                <span class="text-sm">
                  Tip: Với tài khoản 100$, bạn có thể được chia sẻ đến 30% phí
                  trên mỗi giao dịch trong mạng lưới của bạn
                </span>
              </div>

              <div class="flex justify-between items-center mt-4">
                <a class="text-primary hover:underline">Tìm hiểu thêm ?</a>
                <el-button type="primary">Kích hoạt ngay</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-8 bg-gray-100">
      <div class="font-bold">Tài khoản giới thiệu của bạn</div>
      <div class="mt-5 flex">
        <div class="w-1/4">
          <div class="text-subtitle">Mức hoa hồng cơ sở</div>
          <div class="text-4xl font-bold">50%</div>
        </div>
        <div class="w-1/4">
          <div class="text-subtitle">Bạn kiếm được</div>
          <div class="text-4xl font-bold">250VNDS</div>
        </div>
        <div class="w-1/4">
          <div class="text-subtitle">Tổng số bạn bè</div>
          <div class="text-4xl font-bold">12</div>
        </div>
        <div class="w-1/4">
          <div class="text-subtitle">
            <span class="mr-4">Xếp hạng</span>
            <el-button class="button-fab" size="mini" round>
              <span class="font-bold">Danh sách xếp hạng</span>
            </el-button>
          </div>
          <div class="text-4xl font-bold">>9999</div>
        </div>
      </div>
    </div>
    <div class="p-8 bg-white">
      <div class="font-bold">
        Danh sách bạn bè sử dụng mã giới thiệu của bạn
      </div>
      <div class="overflow-x-auto mt-6">
        <div class="table table-hover">
          <table>
            <thead>
              <tr>
                <th class="text-left">Mã giới thiệu</th>
                <th class="text-left">Bạn nhận được</th>
                <th class="text-left">Thông tin bạn bè</th>
                <th class="text-left">Ngày tham gia</th>
                <th class="text-left">Hình thức</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 4" :key="i">
                <td>1201190</td>
                <td>50$</td>
                <td>ID: longam195</td>
                <td>2 day ago</td>
                <td>Mã liên kết</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="p-8 bg-white">
      <card-ads></card-ads>
    </div>

    <div class="p-8 bg-white">
      <div class="font-bold">Lịch sử hoa hồng của bạn</div>
      <div class="overflow-x-auto mt-6">
        <div class="table table-hover">
          <table>
            <thead>
              <tr>
                <th class="text-left">Ngày tháng</th>
                <th class="text-left">Email/ID của bạn bè</th>
                <th class="text-left">Level</th>
                <th class="text-left">Loại hoa hồng</th>
                <th class="text-left">Hoa hồng nhận được</th>
                <th class="text-left">Ngày trả hoa hồng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 4" :key="i">
                <td>
                  <div>
                    <div>15/09/2020</div>
                    <div class="text-sm text-subtitle">13:58</div>
                  </div>
                </td>
                <td>
                  <div class="flex">
                    <span>hoanglong**@gmail.com/</span>
                    <span class="text-subtitle">longam195</span>
                  </div>
                </td>
                <td>F1</td>
                <td>Tham gia</td>
                <td>50$</td>
                <td>2 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardAds from '@/components/common/card-ads'

export default {
  name: 'SettingAffiliate',
  components: { CardAds },
}
</script>

<style scoped></style>
