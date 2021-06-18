import { AxiosRequestConfig } from "axios"
import * as ResponseCode from "../rc"

export default [
  {
    request: {
      url: '/api/v1/module',
      method: "GET",
    },
    response: (config: AxiosRequestConfig) => [200, {
      code: ResponseCode.SUCCESS,
      obj: [
        {
          name: 'dashboard',
          path: '/dashboard',
          component: 'Dashboard',
          i18n: {
            zhCN: { 'dashboard': { title: '概览' } },
            enUS: { 'dashboard': { title: 'Dashboard' } }
          },
          icon: 'speedometer',
          children: null,
          meta: null
        },
        {
          i18n: {
            zhCN: { course: { title: '课题' } },
            enUS: { course: { title: 'Subjects' } }
          },
          name: 'course',
          path: '/course',
          component: 'Course',
          children: null,
          icon: 'school',
          meta: null
        },
        {
          i18n: {
            zhCN: { plan: { title: '计划和进度' } },
            enUS: { plan: { title: 'Plan and Process' } }
          },
          name: 'plan',
          path: '/plan',
          component: 'Plan',
          children: null,
          icon: 'calendar',
          meta: null
        },
        {
          i18n: {
            zhCN: { literature_review: { title: '文献综述' } },
            enUS: { literature_review: { title: 'Literature Review' } }
          },
          name: 'literature_review',
          path: '/literature-review',
          component: 'LiteratureReview',
          children: null,
          icon: 'file-tray-full',
          meta: null
        },
        {
          i18n: {
            zhCN: { weekly_notes: { title: '周记' } },
            enUS: { weekly_notes: { title: 'Weekly Notes' } }
          },
          name: 'weekly_notes',
          path: '/weekly-notes',
          component: 'WeeklyNotes',
          children: null,
          icon: 'brush',
          meta: null
        },
        {
          i18n: {
            zhCN: { weekly_notes: { title: '周记' } },
            enUS: { weekly_notes: { title: 'Weekly Notes' } }
          },
          name: 'weekly_notes',
          path: '/weekly-notes',
          component: 'WeeklyNotes',
          children: null,
          icon: 'brush',
          meta: null
        },
        {
          i18n: {
            zhCN: { startup_report: { title: '开题报告' } },
            enUS: { startup_report: { title: 'Start-up Report' } }
          },
          name: 'startup_report',
          path: '/startup-report',
          component: 'StartupReport',
          children: null,
          icon: 'receipt',
          meta: null
        },
        {
          i18n: {
            zhCN: { translations: { title: '外文翻译' } },
            enUS: { translations: { title: 'Translations' } }
          },
          name: 'translations',
          path: '/translations',
          component: 'Translations',
          children: null,
          icon: 'language',
          meta: null
        },
        {
          i18n: {
            zhCN: { references: { title: '参考文献' } },
            enUS: { references: { title: 'References' } }
          },
          name: 'references',
          path: '/references',
          component: 'References',
          children: null,
          icon: 'bookmarks',
          meta: null
        },
        // {
        //   i18n: {
        //     zhCN: { user_and_group: { title: '用户和用户组' } },
        //     enUS: { user_and_group: { title: 'User & Group' } }
        //   },
        //   name: 'user_and_group',
        //   path: '/user-and-group',
        //   component: 'UserAndGroup',
        //   children: null,
        //   icon: 'people',
        //   meta: null
        // },
        {
          i18n: {
            zhCN: { settings: { title: '设置' } },
            enUS: { settings: { title: 'Settings' } }
          },
          name: 'settings',
          path: '/settings',
          component: 'Settings',
          children: null,
          icon: 'cog',
          meta: null
        }
      ]
    }],
  },
]
