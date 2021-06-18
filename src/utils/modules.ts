import ModuleApi, { IModuleModel } from '@/api/v1/module'
import store from '@/store'
import { addI18nField } from '@/i18n'

export const loadModules = async () => {
    const moduleApi = new ModuleApi()
    try {
      const response = await moduleApi.list()
      if (response.data.code === 0) {
        store.dispatch('clearRouter')
        for (const module of response.data.obj as IModuleModel[]) {
          store.dispatch('mergeRouter', {
            name: module.name,
            path: module.path,
            componentName: module.component,
            children: module.children,
            title: module.i18n,
            meta: module.meta,
            icon: module.icon
          })
          addI18nField(module.i18n)
        }
      } else {
        console.error(response.data.message)
        Promise.reject(response.data.prompt)
      }
    } catch (err) {
      console.error(err)
      Promise.reject(err)
    }
}