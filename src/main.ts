import { createApp } from "vue"
import store from "./store"
import router from "./router"
import i18n from "./i18n"

import App from "./App.vue"

import '@/api/v1/mock'
import { asyncComponent } from '@/utils/router'

import "vfonts/FiraCode.css"
import "vfonts/Lato.css"

import "./style/app.less"

const app = createApp(App).use(i18n).use(router).use(store)
asyncComponent(app)
app.mount("#app")
