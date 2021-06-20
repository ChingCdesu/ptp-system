import BaseApi from "./base"
import { IBaseModel, IRoleModel, TPrivilege } from './interfaces'

class RoleApi extends BaseApi<IRoleModel> {
  constructor() {
    super("role")
  }
}

export default RoleApi
