<template>
  <div
    class="item-loader px-6 py-6 border-r border-b"
    style="max-height: 170px"
  >
    <div class="w-full grid-container">
      <div class="image w-5 h-5 loader rounded-full"></div>
      <div class="coin w-16 h-4 loader rounded"></div>
      <div class="price w-24 h-6 loader rounded mt-1"></div>
      <div class="time w-10 h-4 loader rounded ml-auto"></div>
      <div class="change w-20 h-4 loader rounded ml-auto mt-1"></div>
      <div class="trending w-4/5 h-12 loader rounded mx-auto"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemLoader',
}
</script>

<style scoped></style>
