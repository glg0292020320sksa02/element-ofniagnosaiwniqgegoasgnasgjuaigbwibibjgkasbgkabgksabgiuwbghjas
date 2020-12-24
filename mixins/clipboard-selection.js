const clipboardSelection = {
  data() {
    return {
      clipboardSelection: '',
    }
  },
  mounted() {
    document.addEventListener('copy', this.handleEventCopy)
  },
  beforeDestroy() {
    document.removeEventListener('copy', this.handleEventCopy)
  },
  methods: {
    handleEventCopy() {
      const selection = document.getSelection()

      this.clipboardSelection = selection.toString()
    },
  },
}

export { clipboardSelection }

export default clipboardSelection
