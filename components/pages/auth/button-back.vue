<template>
  <div class="button-back">
    <el-button
      circle
      plain
      type="primary"
      icon="el-icon-back"
      class="text-primary font-bold border-0 hover:bg-primary-100 hover:text-primary"
      @click="onRedirect"
    ></el-button>
  </div>
</template>
<script>
export default {
  name: 'ButtonBack',
  methods: {
    onRedirect() {
      this.$router.go(-1)
    },
  },
}
</script>
