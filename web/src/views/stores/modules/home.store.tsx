/**
 * @fileOverview dashboard store
 * @date 2023-12-26
 * @author poohlaha
 */
import React from 'react'
import { observable, action } from 'mobx'
import BaseStore from '../base/base.store'
import { invoke } from '@tauri-apps/api/primitives'
import { info } from '@tauri-apps/plugin-log'
import { TOAST } from '@utils/base'
import Utils from '@utils/utils'
import data from './data.json'

class HomeStore extends BaseStore {
    @observable bannerList: Array<{[K: string]: any}> = [] // banner列表
    @observable recommendList: Array<{[K: string]: any}> = [] // 推荐列表
    @observable dramaSeriesList: Array<{[K: string]: any}> = [] // 剧集列表
    @observable movieList: Array<{[K: string]: any}> = [] // 电影列表
    @observable cartoonList: Array<{[K: string]: any}> = [] // 动漫列表
    @observable varietyList: Array<{[K: string]: any}> = [] // 综艺列表
    @observable childrenList: Array<{[K: string]: any}> = [] // 少儿列表
    @observable activeTabIndex: number = 0 // 激活的 tab

    readonly tabsList: Array<{[K: string]: any}> = [
        {
            key: 'recommend',
            title: '推荐'
        },
        {
            key: 'dramaSeries',
            title: '剧集'
        },
        {
            key: 'movie',
            title: '电影'
        },
        {
            key: 'cartoon',
            title: '动漫'
        },
        {
            key: 'variety',
            title: '综艺'
        },
        {
            key: 'children',
            title: '少儿'
        },
    ]

    readonly tabBarList: Array<{[K: string]: any}> = [
        {
            key: 'home',
            title: '首页',
            icon: (
                <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M468.906667 57.941333a68.394667 68.394667 0 0 1 86.165333 0l399.936 322.624c30.058667 24.234667 35.136 68.693333 11.328 99.328a69.269333 69.269333 0 0 1-37.802667 24.768l-3.712 0.810667 0.021334 361.514667c0 59.370667-44.48 108.48-102.528 113.877333l-4.736 0.362667-4.949334 0.106666H211.370667c-59.84 0-109.056-47.808-112.106667-109.312l-0.106667-5.034666-0.021333-361.514667-2.453333-0.490667c-29.696-6.848-52.16-33.088-53.909334-64.96L42.666667 436.010667c0-21.610667 9.685333-42.026667 26.325333-55.466667z m46.72 50.026667a5.76 5.76 0 0 0-7.253334 0L108.864 431.146667a6.058667 6.058667 0 0 0-2.218667 4.693333c0 3.328 2.624 6.016 5.866667 6.016h18.816c17.536-0.021333 31.744 14.506667 31.744 32.405333v392.533334l0.064 3.392C164.437333 896.533333 185.792 917.333333 211.712 917.333333h599.765333l3.328-0.085333c25.770667-1.322667 46.101333-23.146667 46.101334-49.621333V474.282667c0-17.92 14.208-32.426667 31.744-32.426667h18.816c1.792 0 3.477333-0.832 4.608-2.261333a6.101333 6.101333 0 0 0-0.96-8.426667z m138.133333 564.693333a32 32 0 0 1-3.754667 45.098667C610.858667 750.890667 568.106667 768 522.666667 768c-45.44 0-88.192-17.109333-127.36-50.24a32 32 0 1 1 41.386666-48.853333C464.704 692.650667 493.056 704 522.666667 704c29.589333 0 57.941333-11.349333 85.973333-35.093333a32 32 0 0 1 45.12 3.754666z"
                        fill="currentColor"></path>
                </svg>
            ),
        },
        {
            key: 'rank',
            title: '排行榜',
            icon: (
                <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M315.597609 894.219711c-62.13867 0-124.393261 0-188.573147 0 0-126.355131 0-252.968887 0-382.249435 63.490354 0 125.046818 0 188.573147 0C315.597609 639.418067 315.597609 765.974062 315.597609 894.219711zM603.685685 893.767018c-60.901509 0-122.853905 0-186.300688 0 0-254.759673 0-508.683912 0-766.051617 62.799822 0 123.42252 0 186.300688 0C603.685685 382.423109 603.685685 637.024689 603.685685 893.767018zM895.189246 894.492526c-62.46245 0-124.032506 0-187.932981 0 0-174.161518 0-348.696784 0-525.524295 61.721953 0 123.860622 0 187.932981 0C895.189246 543.870248 895.189246 718.462275 895.189246 894.492526z"
                        fill="currentColor"></path>
                </svg>
            ),
        },
        {
            key: 'my',
            title: '我的',
            icon: (
                <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M513.141 515.11c114.169 0 206.641-92.472 206.641-206.641S627.31 101.828 513.141 101.828 306.499 194.3 306.499 308.469 398.971 515.11 513.141 515.11z m0 103.32c-137.933 0-413.282 69.225-413.282 206.641v103.32h826.564v-103.32c-0.001-137.416-275.35-206.641-413.282-206.641z"
                        fill="currentColor"></path>
                </svg>
            ),
        },
    ]

    /**
     * 获取首页列表
     */
    @action
    getRecommendList() {
        // @ts-ignore
        this.recommendList = data.data || []
    }

    /**
     * 首页 banner 列表
     */
    getBannerList = () => {
        this.bannerList = [
            {
                "id":2,
                "name":"\u95ee\u5fc3",
                "position":2,
                "status":1,
                "start_time":0,
                "end_time":32503651199,
                "content":"https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg",
                "req_type":1,
                "req_content":"5825",
                "headers":"",
                "time":0,
                "skip_time":0,
                "show_platform":0
            },
            {
                "id":2,
                "name":"\u95ee\u5fc3",
                "position":2,
                "status":1,
                "start_time":0,
                "end_time":32503651199,
                "content":"https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg",
                "req_type":1,
                "req_content":"5825",
                "headers":"",
                "time":0,
                "skip_time":0,
                "show_platform":0
            },
            {
                "id":2,
                "name":"\u95ee\u5fc3",
                "position":2,
                "status":1,
                "start_time":0,
                "end_time":32503651199,
                "content":"https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg",
                "req_type":1,
                "req_content":"5825",
                "headers":"",
                "time":0,
                "skip_time":0,
                "show_platform":0
            },
        ]
    }

}

export default new HomeStore()
