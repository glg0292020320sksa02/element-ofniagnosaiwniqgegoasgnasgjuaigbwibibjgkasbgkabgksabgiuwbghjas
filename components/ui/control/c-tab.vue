<template>
  <div
    class="c-tab border-b border-primary-100 flex flex-row justify-start items-center text-xs"
  >
    <button
      v-for="(item, i) in listItem"
      :key="i + '_ctab'"
      class="px-2 py-1 hover:bg-primary-100"
      :class="
        isActive(item)
          ? 'border-b text-primary border-primary'
          : 'border-b border-transparent'
      "
      @click="changeTab(item)"
    >
      {{ item.text }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'CTab',
  props: {
    items: {
      type: [Array, Object],
      default() {
        return []
      },
    },
    value: {
      type: [String, Object],
      default() {
        return {} || ''
      },
    },
    object: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listItem() {
      return this.items.map(x => {
        return {
          text: this.object ? x.text : x,
          value: this.object ? x.value : x,
        }
      })
    },
  },
  methods: {
    changeTab(payload) {
      this.$emit('input', this.returnObject ? payload : payload.value)
      this.$emit('change', this.returnObject ? payload : payload.value)
    },
    isActive(item) {
      return this.returnObject
        ? this.value.value === item.value
        : this.value === item.value
    },
  },
}
</script>
