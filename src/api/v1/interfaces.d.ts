import { NumbersToN } from "ts-number-range"

// base
export interface ISearchOption {
  keyword: string
}

export interface IMetaDataModel {
  id: number | null,
  related_id: number,
  meta_key: string,
  meta_value: string | null
}

export interface IBaseModel {
  id: number | null,
  meta_data: IMetaDataModel[] | null
}

// role & privilege
export enum EPrivilege {
  Read = 1 << 0,
  Create = 1 << 1,
  Update = 1 << 2,
  Delete = 1 << 3,
}

export type TPrivilege = NumbersToN<15>

export interface IRolePrivilegeModel {
  module_id: number
  privilege: TPrivilege
}

export interface IRoleModel extends IBaseModel {
  name: string
  privileges: IRolePrivilegeModel[]
}

// task
export interface ITaskModel extends IBaseModel {
  name: string,
  checked: boolean
}

// subject
export interface ISubjectModel extends IBaseModel {
  name: string
}

// user
export interface IUserModel extends IBaseModel {
  username: string
  password: string | null
  role: IRoleModel
  token: string | null
  enabled: boolean
}
