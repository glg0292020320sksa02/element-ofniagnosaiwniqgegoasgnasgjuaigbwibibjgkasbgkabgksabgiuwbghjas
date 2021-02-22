<template>
  <div class="progress-bar">
    <div class="percent" :style="{ width: percentage + '%' }"></div>
    <span class="text-xs text-subtitle absolute right-0 progress-label">
      {{ percentage }}%
    </span>
  </div>
</template>

<script>
export default {
  name: 'CProgress',
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="postcss">
.progress-bar {
  height: 4px;
  @apply w-full bg-gray-200 rounded-full relative;
}
.percent {
  height: 4px;
  @apply absolute bg-primary rounded-full;
}
.progress-label {
  top: -20px;
}
</style>
