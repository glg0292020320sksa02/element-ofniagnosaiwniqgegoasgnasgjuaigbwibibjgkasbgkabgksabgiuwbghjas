<template>
  <a-input-number
    v-model.number="currency"
    :default-value="0"
    :formatter="formatter"
    :parser="parser"
    size="large"
    class="w-full"
    v-bind="$attrs"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InputCurrency',
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const formatter = value => {
      return `${props.prefix}${value}${props.suffix}`.replace(
        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
        ','
      )
    }

    const parser = value => value.replace(/\$\s?|(,*)/g, '')

    return { formatter, parser }
  },
  computed: {
    currency: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
})
</script>
