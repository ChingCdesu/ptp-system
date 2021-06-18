import BaseApi, { IBaseModel } from "./base"
import { IRoleModel } from "./role"
import request from "./request"

export interface IUserModel extends IBaseModel {
  username: string
  password: string
  role: IRoleModel
  token: string | null
  enabled: boolean
}

class UserApi extends BaseApi<IUserModel> {
  constructor() {
    super("user")
  }

  async login(username: string, password: string, auto_login: boolean) {
    return await request.get("/user/login", {
      params: { username, password, auto_login, type: "password" },
    })
  }

  async auto_login(user_id: number | null, token: string | null) {
    return await request.get("/user/login", {
      params: {user_id, token, type: 'token'}
    })
  }

  async logout() {}
}

export default UserApi
