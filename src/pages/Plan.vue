<template>{{ title }}</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { snakeCase } from 'change-case'

export default defineComponent({
  name: 'Plan',
  isRouter: true,
  isComponents: true,
  computed: {
    title() {
      if (this.$options.name)
        return this.$t(`${snakeCase(this.$options.name)}.title`)
      else return ''
    }
  }
})
</script>
