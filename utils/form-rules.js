const password = function () {
  return {
    required: {
      required: true,
      message: this.$t('validate.passwordRequired'),
      trigger: 'blur',
    },
    min: {
      min: 8,
      message: this.$t('validate.passwordMin8Character'),
      trigger: 'blur',
    },
    validatorConfirmPassword: fieldCompare => ({
      validator: (rule, value, callback) => {
        if (value !== this.model[fieldCompare]) {
          callback(new Error(this.$t('validate.passwordDontMatch')))
        } else {
          callback()
        }
      },
      trigger: ['blur'],
    }),
  }
}

const email = function () {
  return {
    required: {
      required: true,
      message: this.$t('validate.emailRequired'),
      trigger: 'blur',
    },
    regex: {
      type: 'email',
      message: this.$t('validate.emailWrongFormat'),
      trigger: 'blur',
    },
  }
}

const twoFACode = function () {
  return {
    required: {
      required: true,
      message: 'Mã google là bắt buộc',
      trigger: 'blur',
    },
  }
}

export { password, email, twoFACode }
