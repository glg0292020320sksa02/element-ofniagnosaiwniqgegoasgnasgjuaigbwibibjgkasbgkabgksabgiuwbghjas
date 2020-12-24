<template>
  <div class="p-8">
    <div>
      <div>
        <div class="font-bold">
          {{ $t('select-your-2-step-verification-method') }}
        </div>
      </div>
      <div class="mt-6">
        <div class="flex space-x-4">
          <div class="sm:w-full w-3/5 rounded border p-6">
            <div class="flex justify-between items-center">
              <div class="flex justify-start items-center">
                <svg-icon name="circle-dot" width="26" height="26"></svg-icon>
                <div class="ml-4">
                  <div class="font-bold uppercase">
                    {{ $t('2fa-authentications') }}
                  </div>
                  <div class="text-subtitle text-sm">
                    {{
                      $t('install-an-google-authenticator-app-on-your-phone')
                    }}
                  </div>
                </div>
              </div>
              <div>
                <el-button
                  v-if="isEnable2FA"
                  type="danger"
                  @click="$router.push({ name: 'auth-disable-2fa' })"
                >
                  {{ $t('deactive-2fa') }}
                </el-button>
                <el-button
                  v-else
                  type="primary"
                  @click="$router.push({ name: 'auth-enable-2fa' })"
                >
                  {{ $t('active-2fa') }}
                </el-button>
              </div>
            </div>
          </div>
          <div class="sm:w-full w-2/5 text-subtitle px-4 border-l">
            <div class="flex flex-column items-center h-full">
              <span class="text-sm">
                {{
                  $t(
                    'tip-alway-turn-on-authentication-for-secutiry-transaction'
                  )
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <div>
        <div class="font-bold">{{ $t('setup-authentication') }}</div>
        <div class="text-subtitle text-sm">
          {{ $t('alwayUse2faAuthentication') }}
        </div>
      </div>
      <div class="mt-2">
        <div>
          <el-checkbox v-model="model.a">
            <span class="text-body" :class="{ 'font-bold': model.a }">
              {{ $t('login') }}
            </span>
          </el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="model.b">
            <span class="text-body" :class="{ 'font-bold': model.b }">
              {{ $t('widthdraw') }}
            </span>
          </el-checkbox>
        </div>
      </div>
      <div class="mt-4">
        <el-button type="primary" class="px-8">{{ $t('Save') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SettingSecurity',
  data() {
    return {
      model: {
        a: true,
        b: true,
      },
    }
  },
  computed: {
    ...mapGetters({
      isEnable2FA: 'isEnable2FA',
    }),
  },
}
</script>

<style scoped></style>
