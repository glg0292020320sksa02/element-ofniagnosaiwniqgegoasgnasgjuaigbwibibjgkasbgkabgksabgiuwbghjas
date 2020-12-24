<template>
  <div>callback</div>
</template>

<script>
export default {
  name: 'AuthCallback',
  middleware({ redirect }) {
    redirect('/')
  },
}
</script>

<style scoped></style>
