import i18n from "@/i18n"

const refreshWindowTitle = (routerName: string | symbol | null | undefined) => {
    document.title = i18n.global.t("appName")
    const title = routerName ? i18n.global.t(`${routerName.toString()}.title`) : null
    if (title) {
        document.title += ` | ${title}`
    }
}

export default refreshWindowTitle