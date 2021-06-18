<template>
  <n-card class="card subject-card">
    <template #header>
      <n-space>
        <ion-icon name="school" size="18px"></ion-icon>
        <n-text class="card-title">{{ $t('dashboard.my_subject.title') }}</n-text>
        <div class="percentage-tag">
          <percentage :value="33" :fixed="0" :size="14"></percentage>
        </div>
      </n-space>
    </template>
    <div class="subject-card__content">
      <n-card class="subject-card__content-item" v-for="subject in subjects" :key="subject.id" :style="`--course-color: ${subject.course.color};`">
        <percentage :value="taskPercentage(subject.tasks)"></percentage>
        <n-time
          :time="new Date(subject.last_update).getTime()"
          :to="new Date().getTime()"
          :type="'relative'"
        ></n-time>
        <n-divider />
        <n-space vertical>
          <n-text class="subject_name">{{ subject.name }}</n-text>
          <n-text class="course_name">{{ subject.course.name }}</n-text>
        </n-space>
      </n-card>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NCard, NText, NSpace, NTime, NDivider, NButton, NThing } from 'naive-ui'
import IonIcon from '@/components/IonIcon.vue'
import Percentage from './Percentage.vue'

export default defineComponent({
  name: 'SubjectCard',
  components: {
    NCard,
    NText,
    NSpace,
    NTime,
    NDivider,
    NButton,
    NThing,
    Percentage,
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
            color: '#0cd1e8'
          },
          last_update: '2021-6-15 00:00:00',
          tasks: [
            {
              id: 14,
              name: '完成开题报告',
              checked: true
            },
            {
              id: 14,
              name: '完成开题报告',
              checked: true
            },
            {
              id: 14,
              name: '完成开题报告',
              checked: false
            }
          ]
        },
        {
          id: 15,
          name: '商务后台管理系统',
          last_update: '2021-6-17 00:00:00',
          course: {
            id: 2,
            name: '(17级)项目案例设计与开发实践',
            color: 'orange'
          },
          tasks: [

          ]
        }
      ]
    }
  },
  methods: {
    taskPercentage: (tasks: []) => tasks.length === 0 ? 0 : (tasks.filter(t => t.checked).length / tasks.length * 100)
  },
  computed: {
    completePercentage(subjects :[]) {
      const sum = subjects.reduce((acc, val) => acc + val.tasks.length, 0)
      const completed = subjects.reduce((acc, val) => acc + val.tasks.filter(t => t.checked).length, 0)
      return completed * 100.0 / sum
    }
  }
})
</script>

<style lang="less" scoped>
.percentage-tag {
  border-radius: 100vmax;
  padding: 2px 7px;
  background-blend-mode: lighten;
  background-color: rgba(255, 166, 0, 0.513);
  font-weight: 700;
}

.subject-card__content {
  display: flex;
  justify-content: space-around;
  .subject-card__content-item {
    padding: 0 15px;
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    width: auto;
    &::before {
      content: '';
      top: 0;
      left: 0;
      height: 100%;
      width: 4px;
      position: absolute;
      border-radius: 4px;
      background-color: var(--course-color);
    }
  }

  .subject_name {
    font-size: 24px;
    font-weight: 700;
  }
}
</style>