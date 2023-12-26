/**
 * @fileOverview dashboard store
 * @date 2023-12-26
 * @author poohlaha
 */
import { observable, action } from 'mobx'
import BaseStore from '../base/base.store'
import { invoke } from '@tauri-apps/api/primitives'
import { info } from '@tauri-apps/plugin-log'
import { TOAST } from '@utils/base'
import Utils from '@utils/utils'
import data from './data.json'

class HomeStore extends BaseStore {
  @observable bannerList: Array<{ [K: string]: any }> = [] // banner列表
  @observable recommendList: Array<{ [K: string]: any }> = [] // 推荐列表
  @observable dramaSeriesList: Array<{ [K: string]: any }> = [] // 剧集列表
  @observable movieList: Array<{ [K: string]: any }> = [] // 电影列表
  @observable cartoonList: Array<{ [K: string]: any }> = [] // 动漫列表
  @observable varietyList: Array<{ [K: string]: any }> = [] // 综艺列表
  @observable childrenList: Array<{ [K: string]: any }> = [] // 少儿列表
  @observable activeTabIndex: number = 0 // 激活的 tab

  readonly tabsList: Array<{ [K: string]: any }> = [
    {
      key: 'recommend',
      title: '推荐',
    },
    {
      key: 'dramaSeries',
      title: '剧集',
    },
    {
      key: 'movie',
      title: '电影',
    },
    {
      key: 'cartoon',
      title: '动漫',
    },
    {
      key: 'variety',
      title: '综艺',
    },
    {
      key: 'children',
      title: '少儿',
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
        id: 2,
        name: '\u95ee\u5fc3',
        position: 2,
        status: 1,
        start_time: 0,
        end_time: 32503651199,
        content: 'https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg',
        req_type: 1,
        req_content: '5825',
        headers: '',
        time: 0,
        skip_time: 0,
        show_platform: 0,
      },
      {
        id: 2,
        name: '\u95ee\u5fc3',
        position: 2,
        status: 1,
        start_time: 0,
        end_time: 32503651199,
        content: 'https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg',
        req_type: 1,
        req_content: '5825',
        headers: '',
        time: 0,
        skip_time: 0,
        show_platform: 0,
      },
      {
        id: 2,
        name: '\u95ee\u5fc3',
        position: 2,
        status: 1,
        start_time: 0,
        end_time: 32503651199,
        content: 'https://wx3.sinaimg.cn/large/002do8ZNly1hin0dveutyj60zk1khts502.jpg',
        req_type: 1,
        req_content: '5825',
        headers: '',
        time: 0,
        skip_time: 0,
        show_platform: 0,
      },
    ]
  }
}

export default new HomeStore()
