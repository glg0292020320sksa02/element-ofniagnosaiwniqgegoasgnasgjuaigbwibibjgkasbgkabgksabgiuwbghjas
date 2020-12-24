<template>
  <div class="overflow-x-auto mt-6">
    <div class="table table-hover">
      <table>
        <thead>
          <tr>
            <th v-for="i in 5" :key="'header_' + i">
              <div class="flex justify-center">
                <div class="loader w-20 h-4 rounded"></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 6" :key="i">
            <td>
              <div class="flex justify-center">
                <div class="loader w-32 h-2 rounded"></div>
              </div>
            </td>
            <td>
              <div class="flex justify-center">
                <div class="loader w-64 h-2 rounded"></div>
              </div>
            </td>
            <td>
              <div class="flex justify-center">
                <div class="loader w-32 h-2 rounded"></div>
              </div>
            </td>
            <td>
              <div class="flex justify-center">
                <div class="loader w-32 h-2 rounded"></div>
              </div>
            </td>
            <td>
              <div class="flex justify-center space-x-3">
                <div class="loader w-5 h-5 rounded-full"></div>
                <div class="loader w-5 h-5 rounded-full"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableContentLoader',
}
</script>
