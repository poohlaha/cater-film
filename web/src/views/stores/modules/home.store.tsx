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

  readonly newTabs: Array<{ [K: string]: any }> = [
    {
      key: 'time',
      title: '最新',
    },
    {
      key: 'hits',
      title: '最热',
    },
    {
      key: 'score',
      title: '好评',
    },
  ]

  readonly classTabs: Array<{ [K: string]: any }> = [
    {
      key: 'all',
      title: '全部',
    },
    {
      key: 'xj',
      title: '喜剧',
    },
    {
      key: 'gz',
      title: '古装',
    },
    {
      key: 'jt',
      title: '家庭',
    },
    {
      key: 'fz',
      title: '犯罪',
    },
    {
      key: 'duozuo',
      title: '动作',
    },
    {
      key: 'qh',
      title: '奇幻',
    },
    {
      key: 'wx',
      title: '武侠',
    },
    {
      key: 'aq',
      title: '爱情',
    },
    {
      key: 'qc',
      title: '青春',
    },
    {
      key: 'xy',
      title: '悬疑',
    },
    {
      key: 'kh',
      title: '科幻',
    },
    {
      key: 'jf',
      title: '警匪',
    },
    {
      key: 'diezhan',
      title: '谍战',
    },
    {
      key: 'sz',
      title: '商战',
    },
    {
      key: 'ox',
      title: '偶像',
    },
    {
      key: 'js',
      title: '军事',
    },
    {
      key: 'sh',
      title: '神话',
    },
    {
      key: 'zz',
      title: '战争',
    },
    {
      key: 'ds',
      title: '都市',
    },
    {
      key: 'qcox',
      title: '青春偶像',
    },
    {
      key: 'jq',
      title: '剧情',
    },
    {
      key: 'ls',
      title: '历史',
    },
    {
      key: 'jd',
      title: '经典',
    },
    {
      key: 'xc',
      title: '乡村',
    },
    {
      key: 'qj',
      title: '情景',
    },
    {
      key: 'wj',
      title: '网剧',
    },
    {
      key: 'qt',
      title: '其他',
    },
  ]

  readonly areaTabs: Array<{ [K: string]: any }> = [
    {
      key: 'dl',
      title: '大陆',
    },
    {
      key: 'xg',
      title: '香港',
    },
    {
      key: 'tw',
      title: '台湾',
    },
    {
      key: 'mg',
      title: '美国',
    },
    {
      key: 'hg',
      title: '韩国',
    },
    {
      key: 'rb',
      title: '日本',
    },
    {
      key: 'fg',
      title: '法国',
    },
    {
      key: 'yg',
      title: '英国',
    },
    {
      key: 'dg',
      title: '德国',
    },
    {
      key: 'tg',
      title: '泰国',
    },
    {
      key: 'yd',
      title: '印度',
    },
    {
      key: 'qt',
      title: '其他',
    },
  ]

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
    {
      key: 'record',
      title: '记录',
    },
  ]

  // 剧集 tabs 选择
  @observable normalSort: { [K: string]: any } = {
    name: '',
    class: '',
    area: '',
    lang: '',
    year: '',
    sort: ''
  };

  /**
   * 获取首页推荐列表
   */
  @action
  async getList(params: {[K: string]: any} = {}) {
    try {
      console.info('', params)
      await info(`send params: ${JSON.stringify(params || {})}`)
      this.loading = true
      let queryParams: {[K: string]: any} = {}
      queryParams.name = params.name || ''
      queryParams.class = params.class || ''
      queryParams.area = params.area || ''
      queryParams.lang = params.lang || ''
      queryParams.year = params.year || ''
      queryParams.sort = params.sort || ''

      let results: Array<{ [K: string]: any }> = await invoke('handle', { name: 'HOME', order: queryParams })
      this.loading = false

      this.handleResponse(results)
    } catch (e) {
      this.loading = false
      console.error('get recommend error !', e)
      TOAST.show({ message: '获取推荐列表失败', type: 3 })
      await error(`get recommend error: ${e.toString()}`)
    }
  }

  /**
   * 处理结果
   */
  @action
  handleResponse(result: Array<{ [K: string]: any }> = []) {
    console.info('result:', result)
    // analysis results
    result.forEach((item: { [K: string]: any } = {}) => {
      if (item.name === 'banner') {
        this.bannerList = this.analysisResult(item, '获取视频数据失败') || []
      } else if (item.name === this.tabsList[0].key) {
        this.recommendList = this.analysisResult(item, '获取视频数据失败') || []
      } else if (item.name === this.tabsList[1].key) {
        this.dramaSeriesList = this.analysisResult(item, '获取视频数据失败') || []
      } else if (item.name === this.tabsList[2].key) {
        this.movieList = this.analysisResult(item, '获取视频数据失败') || []
      } else if (item.name === this.tabsList[3].key) {
        this.cartoonList = this.analysisResult(item, '获取视频数据失败') || []
      }
    })
  }

  /**
   * 获取 年限tabs
   */
  @action
   getYearsTabs() {
    const currentYear = new Date().getFullYear()
    const startYear = 2000
    let years: Array<string> = []
    for (let year = startYear; year <= currentYear; year++) {
      years.push('' + year)
    }

    years.reverse()

    let tabs: Array<{ [K: string]: any }> = []
    tabs.push({
      key: 'all',
      title: '全部',
    })

    years.forEach(year => {
      tabs.push({
        key: year,
        title: year,
      })
    })

    return tabs
  }
}

export default new HomeStore()
