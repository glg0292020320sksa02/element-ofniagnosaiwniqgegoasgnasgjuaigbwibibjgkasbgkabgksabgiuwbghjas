<template>
  <div class="button-back">
    <el-button
      circle
      plain
      type="primary"
      icon="el-icon-s-home"
      class="text-primary font-bold border-0 hover:bg-indigo-100 hover:text-primary"
      @click="onRedirect"
    ></el-button>
  </div>
</template>
<script>
export default {
  name: 'ButtonBack',
  methods: {
    onRedirect() {
      this.$router.push('/')
    },
  },
}
</script>
