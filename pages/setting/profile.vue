<template>
  <div class="p-8 space-y-10">
    <change-password></change-password>
    <div class="my-profile">
      <div class="text-xl font-bold">{{ $t('my-profile') }}</div>
      <hr class="my-2" />
      <div class="flex">
        <div class="w-full lg:w-1/2 xl:w-1/3">
          <el-form
            ref="form"
            :model="model"
            label-position="top"
            label-width="120px"
            hide-required-asterisk
            @submit.native.prevent="onSubmit"
          >
            <el-form-item :label="$t('email')" prop="email">
              <el-input :value="$auth.user.email" readonly></el-input>
            </el-form-item>
            <el-form-item :label="$t('name')" prop="name">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('birthday')" prop="birthday">
              <el-date-picker
                v-model="model.birthday"
                value-format="yyyy-MM-dd"
                type="date"
                class="date-picker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('address')" prop="address">
              <el-input v-model="model.address"></el-input>
            </el-form-item>
            <div class="mt-6">
              <el-button
                :disabled="isDisabled"
                :loading="loading"
                type="primary"
                native-type="submit"
              >
                <span class="font-bold">{{ $t('Save') }}</span>
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ElDatePicker from 'element-ui/lib/date-picker'

import ChangePassword from '@/components/pages/setting/profile/change-password'
import validateForm from '@/mixins/validate-form'

export default {
  name: 'Profile',
  components: { ChangePassword, ElDatePicker },
  mixins: [validateForm],
  data() {
    return {
      loading: false,
      model: {
        name: '',
        birthday: '',
        address: '',
      },
    }
  },
  computed: {
    isDisabled() {
      return !this.model.name && !this.model.birthday && !this.model.address
    },
  },
  mounted() {
    this.loadUser()
  },
  methods: {
    ...mapActions({
      updateProfile: 'setting/updateProfile',
    }),
    loadUser() {
      const { name, birthday, address } = this.$auth.user

      this.model.name = name || ''
      this.model.birthday = birthday || ''
      this.model.address = address || ''
    },
    async onSubmit() {
      this.$notify.closeAll()

      try {
        this.loading = true

        const user = await this.updateProfile(this.model)

        this.$auth.setUser(user)

        this.$notify({
          title: this.$t('updateInfomationSuccessful'),
          type: 'success',
        })
      } catch (e) {
        this.$notify({
          title: this.$t('updateInformationFailure'),
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
@import '~element-ui/packages/theme-chalk/src/date-picker.scss';
.date-picker {
  width: 100% !important;
}
</style>
