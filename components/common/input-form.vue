<template>
  <div class="flex flex-col items-stretch">
    <div
      v-if="label && label.length > 0"
      class="text-xs font-bold text-subtitle mb-1 text-"
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
