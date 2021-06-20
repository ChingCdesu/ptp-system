import { AxiosRequestConfig } from "axios"
import * as ResponseCode from "../rc"
import chance from "@/utils/chance"

export default [
  {
    request: {
      url: "/api/v1/user/login",
      method: "GET",
    },
    response: (config: AxiosRequestConfig) => {
      const success = [200, {
        code: ResponseCode.SUCCESS,
        obj: {
          id: 1,
          username: "_ChingC",
          role: {
            name: "admin",
          },
          token: chance.string({ length: 16 }),
          meta_data: {
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
      }]

      const failed = [200, {
        code: ResponseCode.LOGIN_FAILED,
        message: '登录失败',
        prompt: '<Debug Info>'
      }]

      let type = "password"
      if (config.params.type === "token") {
        type = "token"
      }

      if (
        type === "password" &&
        typeof config.params.username === "string" &&
        typeof config.params.password === "string" &&
        typeof config.params.auto_login === "boolean"
      )
        return success

      if (
        type === "token" &&
        typeof config.params.user_id === "number" &&
        typeof config.params.token === "string"
      )
        return success
        
      return failed
    },
  },
]
