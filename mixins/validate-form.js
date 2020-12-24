const validateForm = {
  watch: {
    model: {
      handler() {
        this.$refs.form.clearValidate()
      },
      deep: true,
    },
  },
  methods: {
    async validate(form = 'form') {
      try {
        const callback = (valid, invalidFields) => {
          if (valid) return

          const [field] = Object.keys(invalidFields)

          if (field) {
            this.$refs[field]?.focus()
          }

          throw new Error('Validate!')
        }

        await this.$refs[form].validate(callback)

        return true
      } catch (e) {
        return false
      }
    },
  },
}

export { validateForm }
export default validateForm
