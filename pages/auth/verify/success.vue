<script>
export default {
  name: 'VerifySuccess',
  layout: 'auth',
  auth: false,
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$success({
        title: this.$t('verifyAccountSuccessful'),
        subtitle: this.$t('pleaseReturnHomePage'),
        actionMethod: () => this.$router.push({ name: 'auth-login' }),
      })
    },
  },
}
</script>
