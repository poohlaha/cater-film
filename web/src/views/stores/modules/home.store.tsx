/**
 * @fileOverview dashboard store
 * @date 2023-12-26
 * @author poohlaha
 */
import { observable, action } from 'mobx'
import BaseStore from '../base/base.store'
import { invoke } from '@tauri-apps/api/primitives'
import { info, error } from '@tauri-apps/plugin-log'
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
  @observable recordList: Array<{ [K: string]: any }> = [] // 记录列表
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
   * 获取首页推荐列表
   */
  @action
  async getRecommendList() {
    try {
      this.loading = true
      let result: Array<{ [K: string]: any }> = await invoke('handle', { name: 'HOME', queryName: 'recommend' })
      this.loading = false

      console.info('result:', result)
      // analysis results
      result.forEach((item: { [K: string]: any } = {}) => {
        if (item.name === 'banner') {
          this.bannerList = this.analysisResult(item, '获取视频数据失败!') || []
        } else if (item.name === 'recommend') {
          this.recommendList = this.analysisResult(item, '获取视频数据失败!') || []
        }
      })
    } catch (e) {
      this.loading = false
      console.error('get recommend error !', e)
      TOAST.show({ message: '获取推荐列表失败!', type: 4 })
      await error(`get recommend error: ${e.toString()}`)
    }
  }
}

export default new HomeStore()
