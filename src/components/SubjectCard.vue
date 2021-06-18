<template>
  <n-thing class="card subject-card">
    <template #avatar>
      <ion-icon name="school" size="18px"></ion-icon>
    </template>
    <template #header>{{ $t('dashboard.my_subject.title') }}</template>
  </n-thing>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NThing } from 'naive-ui'
import IonIcon from '@/components/IonIcon.vue'

export default defineComponent({
  name: 'SubjectCard',
  components: {
    NThing,
    IonIcon
  },
  data() {
    return {
      subjects: [
        {
          id: 12,
          name: '实践教学过程管理系统',
          course: {
            id: 1,
            name: '2021届毕业设计',
          }
        },
        {
          id: 15,
          name: '商务后台管理系统',
          course: {
            id: 2,
            name: '(17级)项目案例设计与开发实践'
          }
        }
      ]
    }
  }
})
</script>
