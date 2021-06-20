<template>
  <div class="inner-page">
    <n-h1 :strong="true">
      <n-text>{{ title }}</n-text>
    </n-h1>
    <n-divider />
  </div>
</template>

<script lang="ts">
import { snakeCase } from 'change-case'
import { defineComponent } from 'vue'
import { NH1, NDivider } from 'naive-ui'

export default defineComponent({
  name: 'References',
  components: {
    NH1, NDivider
  },
  computed: {
    title() {
      if (this.$options.name)
        return this.$t(`${snakeCase(this.$options.name)}.title`)
      else return ''
    }
  }
})
</script>

