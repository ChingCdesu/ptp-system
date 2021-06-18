<template>{{ title }}</template>

<script lang="ts">
import { snakeCase } from 'change-case'
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'References',
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

