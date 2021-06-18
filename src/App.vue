<template>
  <n-message-provider>
    <n-loading-bar-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <div class="main">
            <router-view></router-view>
          </div>
        </n-dialog-provider>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider
} from 'naive-ui'

export default defineComponent({
  components: {
    NLoadingBarProvider,
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider
  }
})

</script>