<template>
  <div class="inner-page">
    <n-h1 :strong="true">
      <n-text>{{ title }}</n-text>
    </n-h1>
    <n-divider />
    <n-data-table :columns="dataTableColumns" :data="dataTableView"></n-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { snakeCase } from 'change-case'
import { NDataTable, NTag, NButton, NH1, NDivider, NDatePicker, NInput } from 'naive-ui'

export default defineComponent({
  name: 'Plan',
  components: {
    NDataTable,
    NTag,
    NButton,
    NH1,
    NDivider,
    NDatePicker,
    NInput
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
              name: '开题报告',
              start_time: '2021-6-20 00:00:00',
              end_time: '2021-6-27 00:00:00',
              checked: true
            },
            {
              id: 18,
              name: '数据库设计',
              start_time: '2021-6-20 00:00:00',
              end_time: '2021-6-27 00:00:00',
              checked: true
            },
            {
              id: 142,
              name: 'UI设计',
              start_time: '2021-6-20 00:00:00',
              end_time: '2021-6-27 00:00:00',
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
  computed: {
    title() {
      if (this.$options.name)
        return this.$t(`${snakeCase(this.$options.name)}.title`)
      else return ''
    },
    dataTableView() {
      let tasks = []
      for (const subject of this.subjects) {
        for (const task of subject.tasks) {
          tasks.push({
            key: task.id,
            name: task.name,
            time_range: [Date.parse(task.start_time), Date.parse(task.end_time)],
            checked: task.checked,
            course_name: subject.course.name
          })
        }
      }
      return tasks
    },
    dataTableColumns() {
      return [
        {
          title: this.$t('plan.task_name'),
          key: 'name',
          sortOrder: false,
          render: (row) => {
            return h(
              NInput,
              { value:row.name }
            )
          }
        },
        {
          title: this.$t('plan.course_name'),
          key: 'course_name',
          sortOrder: false,
        },
        {
          title: this.$t('plan.task_time_range'),
          key: 'time_range',
          sortOrder: false,
          render: (row) => {
            return h(
              NDatePicker,
              { value: row.time_range, type: 'daterange', clearable: true }
            )
          }
        },
        {
          title: this.$t('plan.task_checked'),
          key: 'checked',
          sortOrder: false,
          render: (row) => {
            return h(
              NTag,
              { type: row.checked ? 'success' : 'error' },
              row.checked ? this.$t('plan.task_completed') : this.$t('plan.task_uncomplete')
            )
          }
        },
        {
          title: this.$t('actions'),
          key: 'actions',
          render: (row) => {
            return h(
              NButton,
              { type: 'default' },
              row.checked ? this.$t('edit') : this.$t('plan_goto_complete')
            )
          }
        }
      ]
    }
  }
})
</script>
