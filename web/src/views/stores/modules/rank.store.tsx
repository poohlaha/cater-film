/**
 * @fileOverview rank store
 * @date 2023-12-26
 * @author poohlaha
 */
import { observable, action } from 'mobx'
import BaseStore from '../base/base.store'
import { invoke } from '@tauri-apps/api/primitives'
import { info, error } from '@tauri-apps/plugin-log'
import { TOAST } from '@utils/base'
import Utils from '@utils/utils'

class RankStore extends BaseStore {
  @observable hotJList: Array<{ [K: string]: any }> = [] // 热播剧
  @observable hotMList: Array<{ [K: string]: any }> = [] // 热播影
  @observable hotCList: Array<{ [K: string]: any }> = [] // 热播漫
  @observable activeTabIndex: number = 0 // 激活的 tab
  @observable queryParams = {}
  readonly tabsList: Array<{ [K: string]: any }> = [
    {
      key: 'hotJ',
      title: '热播电视剧',
    },
    {
      key: 'hotM',
      title: '热播电影',
    },
    {
      key: 'hotC',
      title: '热播动漫',
    },
  ]

  /**
   * 获取列表
   */
  @action
  async getList(params: { [K: string]: any } = {}, refresh = false) {
    try {
      if (Utils.isBlank(params.name)) return
      console.info('send params', params)
      if (!refresh) {
        this.loading = true
      }

      let queryParams: { [K: string]: any } = {}
      queryParams.name = params.name || ''
      queryParams.class = ''
      queryParams.area = ''
      queryParams.lang = ''
      queryParams.year = ''
      queryParams.sort = ''
      queryParams.page = this.activeTabIndex + 1
      queryParams.tid = ''
      queryParams.text = ''

      this.queryParams = Utils.deepCopy(queryParams)
      console.log('query params:', queryParams)

      let results: Array<{ [K: string]: any }> = []
      if (!refresh) {
        this.loading = false
      }

      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.invoke) {
        // @ts-ignore
        window.webkit.messageHandlers.invoke.postMessage({ name: 'RANK', order: queryParams });
        return
      } else {
        await info(`send params: ${JSON.stringify(params || {})}`)
        results = await invoke('handle', { name: 'RANK', order: queryParams })
      }

      this.handleResponse(results, params.name)
    } catch (e) {
      if (!refresh) {
        this.loading = false
      }
      console.error('get rank list error !', e)
      TOAST.show({ message: '获取排行榜列表失败', type: 3 })
      await error(`get rank list error: ${e.toString()}`)
    }
  }

  /**
   * 处理结果
   */
  @action
  handleResponse(result: Array<{ [K: string]: any }> = [], name: string = '') {
    console.info('result:', result)
    if (Utils.isBlank(name)) return
    // analysis results
    result.forEach((item: { [K: string]: any } = {}) => {
      // @ts-ignore
      this[`${name}List`] = this.analysisResult(item, '获取排行榜列表失败') || []
    })

    // @ts-ignore
    console.log('list', this[`${name}List`])
  }
}

export default new RankStore()
