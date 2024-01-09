/**
 * @fileOverview route
 * @date 2023-04-13
 * @author poohlaha
 */
import React from 'react'
import { RouteInterface } from '@router/router.interface'
import RouterUrls from '@route/router.url.toml'
const { lazy } = React

export const routes: RouteInterface[] = [
  {
    path: '*',
    exact: true,
    component: lazy(() => import(/* webpackChunkName:'dashboard' */ '@pages/dashboard/index')),
    auth: false,
    title: '首页',
  },
  {
    path: "/",
    exact: true,
    component: lazy(() => import(/* webpackChunkName:'dashboard' */ '@pages/dashboard/index')),
    auth: false,
    title: '首页',
  },
  {
    path: RouterUrls.DASHBOARD_URL,
    exact: true,
    component: lazy(() => import(/* webpackChunkName:'dashboard' */ '@pages/dashboard/index')),
    auth: false,
    title: '首页',
  },
  {
    path: RouterUrls.RANK_URL,
    exact: true,
    component: lazy(() => import(/* webpackChunkName:'rank' */ '@pages/rank/index')),
    auth: false,
    title: '排行榜',
  },
  {
    path: RouterUrls.MY_URL,
    exact: true,
    component: lazy(() => import(/* webpackChunkName:'my' */ '@pages/my/index')),
    auth: false,
    title: '我的',
  },
  {
    path: RouterUrls.DETAIL_URL,
    exact: true,
    component: lazy(() => import(/* webpackChunkName:'detail' */ '@pages/detail/index')),
    auth: false,
    title: '详情页面',
  },
  {
    path: RouterUrls.SETTING_URL,
    exact: true,
    component: lazy(() => import(/* webpackChunkName:'setting' */ '@pages/setting/index')),
    auth: false,
    title: '设置',
  },
]
