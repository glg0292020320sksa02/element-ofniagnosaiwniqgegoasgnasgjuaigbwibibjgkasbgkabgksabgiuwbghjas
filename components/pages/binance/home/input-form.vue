<template>
  <div class="flex flex-col items-stretch">
    <div
      v-if="label && label.length > 0"
      class="text-xs font-medium text-gray-800 mb-1 pl-1 flex flex-row justify-between items-center"
    >
      <span>{{ label }}</span>
      <span class="text-subtitle font-normal">{{ sub }}</span>
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
    sub: {
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
