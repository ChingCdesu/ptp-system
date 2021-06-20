import BaseApi from "./base"
import { IUserModel } from "./interfaces"
import request from "./request"
import * as ResponseCode from "./rc"

class UserApi extends BaseApi<IUserModel> {
  constructor() {
    super("user")
  }

  async login(username: string, password: string, auto_login: boolean): Promise<IUserModel> {
    const response = await request.get("/user/login", {
      params: { username, password, auto_login, type: "password" },
    })
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async auto_login(user_id: number | null, token: string | null): Promise<IUserModel> {
    const response = await request.get("/user/login", {
      params: { user_id, token, type: "token" },
    })
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async logout() {}
}

export default UserApi
