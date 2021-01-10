<template>
  <div class="flex flex-col items-stretch">
    <div
      v-if="label && label.length > 0"
      class="text-xs font-bold text-gray-800 mb-1 uppercase pl-1"
    >
      {{ label }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputForm',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>
<style>
.border-l-3 {
  border-left-width: 3px;
}
</style>
