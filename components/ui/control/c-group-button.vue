<template>
  <div
    class="c-group-button bg-white rounded overflow-hidden p-1 border border-indigo-100 flex flex-row justify-between items-stretch"
  >
    <button
      v-for="(item, i) in listItem"
      :key="i + '_cgroupbutton'"
      class="px-3 py-1 text-xs"
      :class="
        returnValue === item.value
          ? 'bg-indigo-600 text-white shadow-sm rounded'
          : ''
      "
      @click="changeTab(item)"
    >
      {{ item.text }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'CGroupButton',
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
          value: this.object ? x.value.toString() : x.toString(),
        }
      })
    },
    returnValue() {
      return this.returnObject ? this.value.value : this.value
    },
  },
  methods: {
    changeTab(payload) {
      this.$emit('input', this.returnObject ? payload : payload.value)
      this.$emit('change', this.returnObject ? payload : payload.value)
    },
  },
}
</script>
