import BaseApi, {IBaseModel} from "./base"

export interface IRoleModel extends IBaseModel {
  name: string
}

class RoleApi extends BaseApi<IRoleModel> {
  constructor() {
    super('role')
  }
}

export default RoleApi
