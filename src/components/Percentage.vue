<template>
  <n-space :style="{ fontSize: `${size}px` }" :align="'flex-end'" :size="0">
    <n-text>
      %{{ part_int }}
    </n-text>
    <n-text v-if="fixed > 0" :style="{ fontSize: '50%' }">.{{ part_float.toString().padStart(fixed, '0') }}</n-text>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NText, NSpace } from 'naive-ui'

export default defineComponent({
  name: 'Percentage',
  components: {
    NText,
    NSpace
  },
  props: {
    size: {
      type: Number,
      default: 18
    },
    value: {
      type: Number,
      required: true
    },
    fixed: {
      type: Number,
      default: 2
    }
  },
  computed: {
    part_int(): number {
      return Math.floor(this.value)
    },
    part_float(): number {
      return Math.floor((this.value - this.part_int) * Math.pow(10, this.fixed))
    }
  }
})
</script>

<style lang="less" scoped>
  .n-text {
    vertical-align: unset;
  }
</style>