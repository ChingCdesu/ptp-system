import axios from "axios"
import ms from "ms"
import store from "@/store"
import CryptoJS from "crypto-js"
import * as ResponseCode from "./rc"
import router from "@/router"

import { useMessage } from "naive-ui"

const BASE_URL_PATH = "/api/v1"

const service = axios.create({
  baseURL: BASE_URL_PATH,
  timeout: ms("1m"),
})

service.interceptors.request.use(
  (config) => {
    const timestamp = new Date().getTime()
    config.headers.timestamp = timestamp
    if (store.state.user.user_id) {
      let hash = CryptoJS.HmacSHA256(
        store.state.user.token || "",
        timestamp.toString()
      )
      config.headers.tk = hash.toString()
      config.headers.uid = store.state.user.user_id
    }
    return config
  },
  (error) => {
    console.error("axios create request error: ", error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.data.code == ResponseCode.TOKEN_UNVERIFIED) {
      const nuMessage = useMessage()
      nuMessage.error("", { duration: 5000 })
      router.push("/login")
    }
    return response
  },
  (error) => {
    console.error("axios create reponse error: ", error)
    return Promise.reject(error)
  }
)

export default service
