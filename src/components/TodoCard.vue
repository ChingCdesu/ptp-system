<template>
  <n-config-provider :theme-overrides="{ common: { inputColor: 'transparent' } }">
    <n-thing class="card todo-card">
      <template #avatar>
        <ion-icon name="checkbox" size="18px"></ion-icon>
      </template>
      <template #header>{{ $t('dashboard.todo.title') }}</template>
      <template #header-extra>
        <n-button text @click="addTodoItem">
          <ion-icon name="add" size="24px"></ion-icon>
        </n-button>
      </template>
      <n-space vertical>
        <n-space
          class="todo-card-item"
          v-for="item of sorted_todo"
          :key="item.id"
          :data-todo-id="item.id"
        >
          <n-checkbox
            v-model:checked="item.checked"
            :disabled="item.id === null"
            @update:checked="updateTodoItem(item)"
          ></n-checkbox>
          <n-input
            v-model:value="item.task"
            :style="{ textDecoration: item.checked ? 'line-through' : 'unset' }"
            @blur="updateTodoItem(item)"
          />
          <n-popconfirm @positive-click="deleteTodoItem(item.id)">
            <template #icon>
              <n-button text type="error">
                <ion-icon name="close" size="18px"></ion-icon>
              </n-button>
            </template>
            <template #trigger>
              <n-button text type="error">
                <ion-icon name="close" size="18px"></ion-icon>
              </n-button>
            </template>
            {{ $t('confirm_delete') }}
          </n-popconfirm>
        </n-space>
      </n-space>
    </n-thing>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NThing, NCheckbox, NSpace, NButton, NList, NInput, NConfigProvider, NPopconfirm } from 'naive-ui'
import IonIcon from '@/components/IonIcon.vue'

export default defineComponent({
  name: 'TodoCard',
  components: {
    NThing,
    NConfigProvider,
    NCheckbox,
    NButton,
    NSpace,
    NList,
    NInput,
    NPopconfirm,
    IonIcon
  },
  data() {
    return {
      todo: [
        {
          id: 1,
          task: '完成周记',
          checked: false
        },
        {
          id: 2,
          task: '撰写开题报告',
          checked: false
        }
      ]
    }
  },
  computed: {
    sorted_todo() {
      return [
        // TODO: 待办列表的interface定义
        ...this.todo.filter(i => !i.checked),
        ...this.todo.filter(i => i.checked),
      ]
    }
  },
  methods: {
    deleteTodoItem(id: number | null) {
      const index = this.todo.findIndex(v => v.id === id)
      if (index !== -1)
        this.todo.splice(index, 1)
    },
    addTodoItem() {
      if (this.todo.findIndex(v => v.id === null) === -1) {
        this.todo.push({
          id: null,
          task: '',
          checked: false
        })
      } else {
        var input = document.querySelector('.todo-card-item:not(*[data-todo-id]) input')
        if (input) {
          (input as HTMLElement).focus()
        }
      }
    },
    updateTodoItem(item: any) {
      item.task = item.task?.trim()
      if (item.id === null) {

      } else {

      }
    }
  }
})
</script>

<style lang="less" scoped>
.todo-card {
  width: 30%;
  min-width: 150px;
}
.todo-card-item {
  display: flex;
  justify-content: space-between !important;
  align-items: center;
}
</style>