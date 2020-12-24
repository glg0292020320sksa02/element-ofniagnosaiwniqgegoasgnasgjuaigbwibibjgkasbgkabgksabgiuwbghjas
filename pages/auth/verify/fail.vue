<script>
export default {
  name: 'VerifyFail',
  layout: 'auth',
  auth: false,
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$error({
        title: this.$t('verifyAccountFailure'),
        subtitle: this.$t('pleaseContactAdministrator'),
        actionMethod: () => this.$router.push({ name: 'auth-login' }),
      })
    },
  },
}
</script>
