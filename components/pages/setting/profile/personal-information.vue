<template>
  <div class="personal-information">
    <div class="text-xl font-bold">{{ $t('personal-information') }}</div>
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
          <el-form-item :label="$t('name')" prop="legalName">
            <el-input v-model="model.legalName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('birthday')" prop="birthday">
            <el-input v-model="model.birthday"></el-input>
          </el-form-item>
          <el-form-item :label="$t('address')" prop="address">
            <el-input v-model="model.address"></el-input>
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
  name: 'PersonalInformation',
  data() {
    return {
      loading: false,
      model: {
        legalName: '',
        birthday: '',
        address: '',
      },
      rules: {
        legalName: [
          {
            required: true,
            message: this.$t('validate.legalNameRequired'),
            trigger: 'blur',
          },
        ],
        birthday: [
          {
            required: true,
            message: this.$t('validate.birthdayRequired'),
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: this.$t('validate.addressRequired'),
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
        await this.$timeout(2000)
      } catch (e) {
        console.error(e.message)
      } finally {
        this.loading = false
      }
    },
    async validate() {
      try {
        return await this.$refs.form.validate()
      } catch {
        return false
      }
    },
  },
}
</script>

<style lang="scss"></style>
