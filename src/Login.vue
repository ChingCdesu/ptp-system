<template>
  <n-config-provider
    class="page login-page ptp-image-background"
    :theme="useDarkTheme ? darkTheme : null"
  >
    <div class="language-switcher">
      <language-switcher @changed="onLanguageChanged"></language-switcher>
    </div>
    <n-form
      class="login-form"
      :label-width="120"
      :model="value"
      ref="formRef"
      :rules="rules"
      size="medium"
      label-placement="left"
      label-align="right"
    >
      <n-space class="login-form__header" align="center">
        <n-avatar size="large" :src="logo_2x"></n-avatar>
        <n-h1 prefix="bar" :style="{ 'margin-bottom': 0 }">
          <n-text type="primary">{{ $t('appName') }}</n-text>
        </n-h1>
      </n-space>
      <n-divider />
      <n-form-item path="username" :label="$t('login.username')">
        <n-input v-model:value="value.username" :placeholder="''" />
      </n-form-item>
      <n-form-item path="password" :label="$t('login.password')">
        <n-input type="password" v-model:value="value.password" :placeholder="''" />
      </n-form-item>
      <n-form-item path="auto_login" :label="$t('login.auto_login')">
        <div
          :style="{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }"
        >
          <n-switch v-model:value="value.auto_login" />
          <n-button type="primary" round @click="login">{{ $t('login.login') }}</n-button>
        </div>
      </n-form-item>
    </n-form>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NForm, NFormItem, NInput, NSwitch, NAvatar, NDivider, NSpace, NText, NH1, NButton } from 'naive-ui';
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useMessage } from 'naive-ui'
import logo_2x from '@/assets/images/logo@2x.jpg'
import i18n from '@/i18n'
import UserApi from '@/api/v1/user'
import store from '@/store'
import router from '@/router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

export default defineComponent({
  name: 'Login',
  components: {
    NForm,
    NFormItem,
    NInput,
    NSwitch,
    NConfigProvider,
    NAvatar,
    NDivider,
    NSpace,
    NText,
    NH1,
    NButton,
    LanguageSwitcher
  },
  setup() {
    const message = ref(useMessage())
    let msgBox: any = null
    const formRef = ref()
    if (store.state.user.user_id && store.state.user.auto_login) {
      const userApi = new UserApi()
      userApi.auto_login(store.state.user.user_id, store.state.user.token)
        .then(user => {
          msgBox = message.value.loading(i18n.global.t('login.tips.auto_login_success'))
          store.dispatch('setUserId', user.id)
          store.dispatch('setUserToken', user.token)
          router.push({ name: 'dashboard' }).then(() => {
            setTimeout(() => {
              msgBox.destroy()
            }, 500);
          })
        })
        .catch(err => {
          console.error(err)
          msgBox.type = "error"
          msgBox.content = i18n.global.t('login.tips.auto_login_failed', { err })
        })
    }
    return {
      darkTheme,
      message,
      logo_2x,
      formRef
    }
  },
  data() {
    return {
      // TODO: 调整主题，以适应背景颜色，增加文字易读性
      useDarkTheme: true,
      value: {
        username: '',
        password: '',
        auto_login: false
      },
      rules: {
        username: {
          required: true,
          message: this.$t('login.please_input_username'),
          trigger: 'blur'
        },
        password: {
          required: true,
          message: this.$t('login.please_input_password'),
          trigger: 'blur'
        },
      }
    }
  },
  methods: {
    onLanguageChanged() {
      this.rules.username.message = this.$t('login.please_input_username')
      this.rules.password.message = this.$t('login.please_input_password')
      this.formRef.validate((error: any) => { })
    },
    login() {
      const userApi = new UserApi()
      let msgBox: any = null
      store.dispatch('setAutoLogin', this.value.auto_login)
      userApi.login(this.value.username, this.value.password, this.value.auto_login).then(user => {
        msgBox = this.message.loading(this.$t('login.tips.login_success'))
        store.dispatch('setUserId', user.id)
        store.dispatch('setUserToken', user.token)
        router.push({ name: 'dashboard' }).then(() => {
          setTimeout(() => {
            msgBox.destroy()
          }, 500);
        })
      }).catch(err => {
        console.error(err)
        msgBox.type = "error"
        msgBox.content = this.$t('login.tips.login_failed', { err })
      })
    }
  }
})
</script>

<style lang="less" scoped>
@import "./style/variables.less";

.language-switcher {
  position: fixed;
  top: 20px;
  right: 40px;
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  // TODO: 替换掉图片背景
  background-image: url("/src/assets/images/login-background.jpg");
  .login-form {
    min-width: 450px;
    max-width: 550px;
    width: 33%;
    padding: 24px 20px;
    border-radius: @form-radius;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
    // TODO: 调整form背景颜色，以适应背景图片主色调
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
}
</style>