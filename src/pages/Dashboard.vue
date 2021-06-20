<template>
  <div class="inner-page">
    <n-h1 :strong="true">
      <n-text>{{ title }}</n-text>
    </n-h1>
    <n-divider />
    <n-space vertical>
      <subject-card></subject-card>
      <todo-card></todo-card>
    </n-space>
  </div>
</template>

<script lang="ts">
import { snakeCase } from 'change-case';
import { defineComponent } from 'vue'
import { NH1, NText, NInput, NConfigProvider, NSpace, NDivider } from 'naive-ui'
import IonIcon from '@/components/IonIcon.vue'
import TodoCard from '@/components/TodoCard.vue'
import SubjectCard from '@/components/SubjectCard.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    NH1,
    NText,
    NInput,
    NConfigProvider,
    IonIcon,
    NSpace,
    NDivider,
    TodoCard,
    SubjectCard
  },
  data() {
    return {
      timestamp: new Date().getTime()
    }
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

<style lang="less" scoped>
</style>
