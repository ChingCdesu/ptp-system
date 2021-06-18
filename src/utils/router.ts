import { defineAsyncComponent, App } from "vue"
import { RouteRecordRaw } from "vue-router"
import { pascalCase, paramCase, snakeCase } from 'change-case'

function getModules() {
    const components = import.meta.glob('../pages/**/*.vue')
    return components
}
function getComponents() {
    const components = import.meta.globEager('../pages/**/*.vue')
    return components
}
// 自动注册组件
export const asyncComponent = function (app: App<Element>): void {
    const modules = getModules()
    const components = getComponents()
    Object.keys(modules).forEach((key: string) => {
        const viewSrc = components[key]
        const file = viewSrc.default
        const AsyncComponent = defineAsyncComponent(modules[key])
        app.component(pascalCase(file.name), AsyncComponent)
    })
}

// 自动注册路由
export const vueRouters = function (): Array<RouteRecordRaw> {
    let routerList: Array<RouteRecordRaw> = []
    const modules = getModules()
    const components = getComponents()
    Object.keys(modules).forEach(key => {
        const viewSrc = components[key]
        const file = viewSrc.default
        routerList.push({
            path: `/${paramCase(file.name)}`,
            name: `${snakeCase(file.name)}`,
            component: modules[key]
        })
    })
    return routerList
}
