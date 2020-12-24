<template>
  <div class="flex items-center justify-between">
    <span class="text-lg font-bold">
      <slot></slot>
    </span>
    <el-button
      circle
      icon="el-icon-close"
      class="button-fab font-bold"
      size="medium"
      @click="onRedirect"
    ></el-button>
  </div>
</template>
<script>
export default {
  name: 'CardHeader',
  methods: {
    onRedirect() {
      this.$router.back()
    },
  },
}
</script>
