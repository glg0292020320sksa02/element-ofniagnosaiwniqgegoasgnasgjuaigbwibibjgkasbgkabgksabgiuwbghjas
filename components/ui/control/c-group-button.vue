<template>
  <div
    class="c-group-button bg-white rounded p-0 border border-indigo-100 flex flex-row justify-between items-stretch"
  >
    <button
      v-for="(item, i) in listItem"
      :key="i + '_cgroupbutton'"
      class="px-2 py-1 text-xs rounded shadow-lg"
      :class="isActive(item) ? 'bg-indigo-600 text-white ' : ''"
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
          value: this.object ? x.value : x,
        }
      })
    },
  },
  methods: {
    changeTab(payload) {
      this.$emit('input', this.returnObject ? payload : payload.value)
    },
    isActive(item) {
      console.log(
        this.returnObject
          ? this.value.value === item.value
          : this.value === item.value
      )

      return this.returnObject
        ? this.value.value === item.value
        : this.value === item.value
    },
  },
}
</script>
