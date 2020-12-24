<template>
  <div class="my-profile">
    <div class="text-xl font-bold">{{ $t('my-profile') }}</div>
    <hr class="my-2" />
    <div class="flex">
      <div class="w-1/4">
        <el-form
          ref="form"
          :model="model"
          :rules="rules"
          label-position="top"
          label-width="120px"
          hide-required-asterisk
          @submit.native.prevent="onSubmit"
        >
          <el-form-item :label="$t('displayName')" prop="displayName">
            <el-input v-model="model.displayName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('email')" prop="email">
            <el-input v-model="model.email"></el-input>
          </el-form-item>
          <div class="mt-6">
            <el-button :loading="loading" type="primary" native-type="submit">
              <span class="font-bold">{{ $t('Save') }}</span>
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProfile',
  data() {
    return {
      loading: false,
      model: {
        email: '',
        displayName: '',
      },
      rules: {
        displayName: [
          {
            required: true,
            message: this.$t('validate.displayNameRequired'),
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    async onSubmit() {
      const isValid = await this.validate()

      if (!isValid) return

      try {
        this.loading = true
      } catch (e) {
        console.error(e.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss"></style>
